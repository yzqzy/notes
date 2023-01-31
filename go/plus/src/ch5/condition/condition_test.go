package condition_test

import "testing"

func TestIfMulitSec(t *testing.T) {
	if a := 1 == 1; a {
		t.Log("1 == 1")
	}
}
