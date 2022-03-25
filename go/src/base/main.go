package main

import (
	"fmt"
)

func main() {
	// helloword
	fmt.Println("Hello World!")

	var hello string = "hello, golang"
	fmt.Println(hello)

	// 变量定义
	var age int = 35
	fmt.Println(age)

	var tall float64 = 1.70
	fmt.Println(tall)

	// 类型不兼容
	// age = "stri"

	// 支持类型推断
	var hello1 string = "hello"
	var hello2 = "word"
	fmt.Println(hello1, hello2)
	// 同时定义多个变量
	var int1, int2 = 33, 44
	fmt.Println(int1, int2)

	// 条件表达式

}
