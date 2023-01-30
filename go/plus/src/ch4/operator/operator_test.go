package operator_test

import "testing"

func TestCompareArray(t *testing.T) {
	a := [...]int{1, 2, 3, 4}
	b := [...]int{1, 3, 4, 5}
	c := [...]int{1, 2, 3, 4, 5}
	d := [...]int{1, 2, 3, 4}

	t.Log(a == b) // false
	// t.Log(a == c) // cannot compare a == c (mismatched types [4]int and
	t.Log(a == d) // true

	t.Log(a, b, c, d)
}
