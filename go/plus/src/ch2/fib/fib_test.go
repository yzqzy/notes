package fib

import (
	"testing"
)

func TestFibList(t *testing.T) {
	// 1. 第一种方式
	// var a int = 1
	// var b int = 1

	// 2. 第二种方式
	// var (
	// 	a int = 1
	// 	b     = 1
	// )

	// 3. 第三种方式
	a := 1
	b := 1

	t.Log(a)

	for i := 0; i < 5; i++ {
		t.Log(" ", b)
		tmp := a
		a = b
		b = tmp + a
	}
}

func TestExchange(t *testing.T) {
	// a := 1
	// b := 2
	// tmp := a
	// a = b
	// b = tmp

	a := 1
	b := 2

	a, b = b, a

	t.Log(a, b)
}
