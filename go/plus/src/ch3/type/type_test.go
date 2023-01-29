package type_test

import "testing"

type MyInt int64

func TestType(t *testing.T) {
	var a int = 1

	var b int64
	var c int32

	// b = a // cannot use a (variable of type int) as int64 value in assignmentcompiler
	// c = a // cannot use a (variable of type int) as int64 value in assignmentcompiler

	b = int64(a)
	c = int32(a)

	var d MyInt
	d = MyInt(a)

	t.Log(a, b, c, d)
}

func TestPoint(t *testing.T) {
	a := 1
	aPtr := &a

	// aPtr = aPtr + 1 // cannot convert 1 (untyped int constant) to *int

	t.Log(a, aPtr)           // 1 0x140000a41c8
	t.Logf("%T %T", a, aPtr) // int *int
}

func TestStrng(t *testing.T) {
	var s string

	t.Log("*" + s + "*") // **
	t.Log(len(s))        // 0
}
