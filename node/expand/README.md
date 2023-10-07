# 趣学 Node.js

## 事件循环与异步IO

Node.js 基于 Ryan dahl 开发的 libuv 实现了自己的事件循环与异步I/O。

> Node.js 于 0.5.0 版本引入了 libuv。
>
> 在 libuv 的最初版本中实现中， linux 和 mac 中是基于 libev 和 liveio 的封装，多路复用是基于 epoll 和 kqueue。在 windows 中，使用的是 IOCP。
>
> libuv 在 v0.9.4 版本中，移除了 libev 的依赖。

Node.js 的单线程是对你而言。对底层则不是，其他线程并不对你开放。

nodejs v18.12.1 版本事件循环代码：

```c++
do {
  if (env->is_stopping()) break;
  uv_run(env->event_loop(), UV_RUN_DEFAULT);
  if (env->is_stopping()) break;

  platform->DrainTasks(isolate);

  more = uv_loop_alive(env->event_loop());
  if (more && !env->is_stopping()) continue;

  if (EmitProcessBeforeExit(env).IsNothing())
    break;

  {
    HandleScope handle_scope(isolate);
    if (env->RunSnapshotSerializeCallback().IsEmpty()) {
      break;
    }
  }

  // Emit `beforeExit` if the loop became alive either after emitting
  // event, or after running some callbacks.
  more = uv_loop_alive(env->event_loop());
} while (more == true && !env->is_stopping());
```

> [源码地址](https://github.com/nodejs/node/blob/v18.12.1/src/api/embed_helpers.cc#L35)

`is_stopping` 判断处于停止状态，就立刻结束事件循环。不过这个判断其实可以忽略，因为执行任务无处不在。

第一次 `uv_run` 之后，会执行 V8 platform 中的任务，跑完后通过 `uv_loop_alive()` 返回值判断是否还有没有新的事件。

* 如果不为 0，直接 `continue` 进入下一次事件循环；
* 如果为 0，处理扫尾工作。如果存在 `process.on('beforeExit')` 事件，意味着执行过程中还有新的事件（例如 `setTimeout` 等）。

`uv_run` 是 libuv 中的代码，因为 libuv 是跨平台的，这里以 [UNIX 类系统代码](https://github.com/nodejs/node/blob/v18.12.1/deps/uv/src/unix/core.c#L369-L426)为例。

```c
static int uv__loop_alive(const uv_loop_t* loop) {
  return uv__has_active_handles(loop) ||
         uv__has_active_reqs(loop) ||
         loop->closing_handles != NULL;
}


int uv_loop_alive(const uv_loop_t* loop) {
    return uv__loop_alive(loop);
}
```

```c
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

  while (r != 0 && loop->stop_flag == 0) {
    uv__update_time(loop);
    uv__run_timers(loop);
    ran_pending = uv__run_pending(loop);
    uv__run_idle(loop);
    uv__run_prepare(loop);

    timeout = 0;
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);

    /* Run one final update on the provider_idle_time in case uv__io_poll
     * returned because the timeout expired, but no events were received. This
     * call will be ignored if the provider_entry_time was either never set (if
     * the timeout == 0) or was already updated b/c an event was received.
     */
    uv__metrics_update_idle_time(loop);

    uv__run_check(loop);
    uv__run_closing_handles(loop);

    if (mode == UV_RUN_ONCE) {
      /* UV_RUN_ONCE implies forward progress: at least one callback must have
       * been invoked when it returns. uv__io_poll() can return without doing
       * I/O (meaning: no callbacks) when its timeout expires - which means we
       * have pending timers that satisfy the forward progress constraint.
       *
       * UV_RUN_NOWAIT makes no guarantees about progress so it's omitted from
       * the check.
       */
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }

  /* The if statement lets gcc compile it to a conditional store. Avoids
   * dirtying a cache line.
   */
  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
```

逐步进行分析，首先判断有没有活跃事件（监听I/O，定时器...），即 `uv__loop_alive()`。

若无活跃事件，则直接更新 `loop` 的最后处理时间，否则就进入 `while` 循环。

这里说的 "更新 loop 最后处理时间"，即 `uv__update_time()` 里面的逻辑就是更新 `loop` 结构体内部的时间戳字段：

```c
UV_UNUSED(static void uv__update_time(uv_loop_t* loop)) {
  /* Use a fast time source if available.  We only need millisecond precision.
   */
  loop->time = uv__hrtime(UV_CLOCK_FAST) / 1000000;
}
```

> 最后一轮事件循环处理的时间是 `uv__hrtime(UV_CLOCK_FAST) / 1000000` 。

当进入 `while` 循环：

* 更新 `loop` 最后处理时间；
* 执行[定时事件](https://github.com/nodejs/node/blob/v18.12.1/deps/uv/src/timer.c#L163-L180)；
  * 大概流程就是在定时事件的小根堆里遍历出相较于之前更新的 “loop 最新处理时间” 已过期的事件，并依次执行其回调。

```c
void uv__run_timers(uv_loop_t* loop) {
  struct heap_node* heap_node;
  uv_timer_t* handle;

  for (;;) {
    heap_node = heap_min(timer_heap(loop));
    if (heap_node == NULL)
      break;

    handle = container_of(heap_node, uv_timer_t, heap_node);
    if (handle->timeout > loop->time)
      break;

    uv_timer_stop(handle);
    uv_timer_again(handle);
    handle->timer_cb(handle);
  }
}
```

* 遍历并执行 I/O 已结束（完成、失败）并丢进 `pending` 队列等待后续处理的事件对应的回调；
* 遍历并执行空转（Idle）事件；
* 遍历并执行准备（Prepare）事件；
* 获取没有触发距离现在最近的定时器的时间间隔（uv_backend_timeout），即事件循环到洗一次循环的最长时间；
* 根据 epoll、kqueue 等 I/O 多路复用机制，去监听等待 I/O 事件触发，并以上一步获取的时间间隔最为最大监听时间，若超时还未有事件触发，则直接取消此次等待（如果时间到了还没有事件触发，但是定时器触发时间到了，libuv 就要停下来处理下一轮定时器）；
* 执行一遍 `uv__metrics_update_idle_time()`，更新 `loop` 中 metrics 里的 `idle_time`，
