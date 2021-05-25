import {invoke } from "./navigation/invoke";

// 微前端框架是否已启动
let started = false;

export function start () {
  if (started) {
    return;
  }
  started = true;
  invoke();
}

export function isStarted () {
  return started;
}