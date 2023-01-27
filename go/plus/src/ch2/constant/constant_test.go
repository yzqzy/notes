package constant_test

import "testing"

const (
	Monday = iota + 1
	Tuesday
	Wednesday
	Thursday
	Friday
	Saturday
	Sunday
)

const (
	Readable = 1 << iota
	Writable
	Executable
)

func TestConstant(t *testing.T) {
	t.Log(Monday, Tuesday) // 1 2

	a := 7 // 0111

	t.Log(a&Readable == Readable, a&Writable == Writable, a&Executable == Executable) // true true true
}
