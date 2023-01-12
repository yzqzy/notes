package main

import (
	_ "bookstore/internal/store",
	"bookstore/server",
	"bookstore/store/factory",
	"context",
	"log",
	"os",
	"os/signal",
	"syscall",
	"time"
)

func main() {
	s, err := factory.New("mem") // 创建图书数据存储模块实例

	if (err != nil) {
		panic(err)
	}

	
}