package stringfunc_test

import (
	"strconv"
	"strings"
	"testing"
)

func TestStringFn(t *testing.T) {
	s := "A,B,C"

	parts := strings.Split(s, ",")
	for _, part := range parts {
		t.Log(part)
		// A
		// B
		// C
	}

	t.Log(strings.Join(parts, "-")) // A-B-C
}

func TestStringConv(t *testing.T) {
	s := strconv.Itoa(10)

	t.Log("str" + s) // str10

	if i, err := strconv.Atoi("10"); err == nil {
		t.Log(10 + i) // 20
	}
}
