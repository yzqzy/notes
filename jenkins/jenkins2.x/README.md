# Jenkins

## pipeline 入门

### 第一个流水线

Jenkinsfile

```jsx
pipeline {
  agent any
  
  stages {
    stage ("Build") {
      steps {
        echo "Building..."
      }
    }

    stage ("Test") {
      steps {
        echo "Testing..."
      }
    }

    stage ("Deploy") {
      steps {
        echo "Deploying..."
      }
    }
  }
}
```

### 版本控制库拉取 pipeline

。。。

## pipeline 语法讲解

### pipeline 组成

Jenkins pipeline 其实就是基于 Groovy 语言实现的一种 DSL（领域特定语言），用于描述整条流水线是如何进行的。流水前的内容哦那个包括执行编译、打包、测试、输出、测试报告等步骤。

#### pipeline 最简结构

```jsx
pipeline {
  agent any
  
  stages {
    stage ("Build") {
      steps {
        echo "Building..."
      }
    }
  }
}
```

* pipeline：代表整条流水线，包含整条流水线的逻辑；
* stage 部分：阶段，代表流水线的阶段。每个阶段都必须有名称；
* stages：流水线中多个 stage 的容器。stages 部分至少包含一个 stage；
* steps 部分：代表阶段中的一个或多个具体步骤（step）的容器。steps 部分至少包含一个步骤；
* agent 部分：指定流水线的执行位置（Jenkins agent）。流水线中的每个阶段都必须在某个地方（物理机、虚拟机或 Docker 容器）执行，agent 部分即指定具体再哪里执行。

以上每一个部分（section）都是必需的，少一个，Jenkins 都会报错。

####  步骤

pipeline 基本结构决定的是 pipeline 整体流程，真正生效的还是 pipeline 中的每一个步骤。步骤是 pipeline 中已经不能在拆分的最小操作。

不过 pipeline 的步骤是可插拔的，就像 Jenkins 的插件一样。Jenkins 提供了对现有插件进行修改，就可以在 pipeline 中当成一个步骤使用。这样就降低了从现有依赖于界面的插件过渡到 pipeline 中步骤的成本。

已经有很多插件适配了 Jenkins pipeline：https://github.com/jenkinsci/pipeline-plugin/blob/master/COMPATIBILITY.md。

只要安装了这些适配了 Jenkins pipeline 的插件，就可以使用其提供的 pipeline 步骤。

Jenkins 官方也提供了 pipeline 步骤参考文档：https://www.jenkins.io/doc/pipeline/steps/。

### post 部分

post 部分包含的是在整个 pipeline 或阶段完成后一些附加的步骤。post 部门是可选的。

根据 pipeline 或阶段的完成状态，post 部分分成多种条件块，包括：

* always：不论当前完成状态是什么，都执行；
* changed：只要当前完成状态与上一次完成状态不同就执行；
* fixed：上一次完成状态未失败或不稳定（unstable），当前完成状态为成功时执行；
* regression：上一次完成状态为成功，当前完成状态为失败、不稳定或中止（aborted）时执行；
* aborted：当前执行结果是中止状态时（一般是人为中止）执行；
* failure：当前完成状态为失败时执行；
* success：当前完成状态为成功时执行；
* unstable：当前完成状态为成功时执行；
* cleanup：清理条件块。不论当前完成状态是什么，在其他所有条件块执行完成后都执行。post 部门可以包含多种条件快，以下是 post 部分的完整示例。

```jsx
pipeline {
  agent any
  
  stages {
    stage ("build") {
      steps {
        echo "build stage"
      }

      post {
				always {
          echo "stage post alwasy"
        }        
      }
    }
  }
  
  post {
    changed {
      echo "pipeline post changed"
    }
    
    always {
      echo "pipeline post always"
    }
    
    success {
      echo "pipeline post success"
    }
    
    failure {
      echo "pipeline post failure"
    }
  }
}
```

### pipeline 支持的指令

基本结构无法满足现实多变的需求。所以，Jenkins pipeline 通过各种指令（directive）类丰富自己。指令可以被理解为对 Jenkins pipeline 基本结构的补充。

Jenkins pipeline 支持的指令有：

* environment：用于设置环境变量，可定义在 stage 或 pipeline 部分；
* tools：可定义在 pipeline 或 stage 部门，它会自动下载并安装我们执行的工具，并将其加入 PATH 变量中；
* input：定义在 stage 部分，会暂停 pipeline，提示你输入内容；
* options：用于配置 Jenkins pipeline 本身的选项，比如 options {retry (3) } 指当 pipeline 失败时再重试 2 次。options 质量可以定义在 stage 或 pipeline 部分；
* parallel：并行执行多个 step。在 pipeline 插件 1.2 版本之后，parallel 开始支持多个阶段进行并行执行；
* parameters：与 input 不同，parameters 是执行 pipeline 前传入的一些参数；
* triggers：用于定义执行 pipeline 的触发器；
* when：当满足 when 定义的条件时，阶段才执行。

使用指令时，需要注意的是每个指令都有自己的 “作用域。如果指令使用的位置不正确，Jenkins 将会报错。

### pipeline 本身配置 

