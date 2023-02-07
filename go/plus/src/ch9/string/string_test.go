package string_test

import (
	"testing"
)

func TestString(t *testing.T) {
	var s string
	t.Log(s) // 初始化为默认零值

	s = "hello"
	t.Log(len(s)) // 5

	// string 是不可变的 byte 切片
	// s[1] = '3' // cannot assign to s[1] (value of type byte)

	s = "\xE4\xB8\xA5" // 可以存储二进制数据
	t.Log(s)           // 严

	s = "中"
	t.Log(len(s)) // 3 存储的是 byte 数

	c := []rune(s)
	t.Log(len(c)) // 1
	// t.Log("run size:", unsafe.Sizeof(c[0])) // run size: 4

	t.Logf("中 unicode %x", c[0]) // 中 unicode 4e2d
	t.Logf("中 utf8 %x", s)       // 中 utf8 e4b8ad
}

func TestStringToRune(t *testing.T) {
	s := "中华人民共和国"

	for _, c := range s {
		t.Logf("%[1]c %[1]d", c)
		// 中 20013
		// 华 21326
		// 人 20154
		// 民 27665
		// 共 20849
		// 和 21644
		// 国 22269
	}
}
