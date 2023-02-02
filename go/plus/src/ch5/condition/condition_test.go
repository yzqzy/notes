package condition_test

import "testing"

func TestIfMulitSec(t *testing.T) {
	if a := 1 == 1; a {
		t.Log("1 == 1")
	}
}

func TestSWitchMultiCase(t *testing.T) {
	for i := 0; i < 5; i++ {
		switch i {
		case 0, 2:
			t.Log("even")
		case 1, 3:
			t.Log("odd")
		default:
			t.Log("it is not 0-3")
		}
	}
}

func TestSwitchCaseCondition(t *testing.T) {
	for i := 0; i < 5; i++ {
		switch {
		case i%2 == 0:
			t.Log("even")
		case i%2 == 1:
			t.Log("odd")
		default:
			t.Log("it is not 0-3")
		}
	}
}
