package map_test

import "testing"

func TestMapWithFunValue(t *testing.T) {
	m := map[int]func(op int) int{}

	m[1] = func(op int) int { return op }
	m[2] = func(op int) int { return op * op }
	m[3] = func(op int) int { return op * op * op }

	t.Log(m[1](2), m[2](2), m[3](2)) // 2 4 8
}

func TestMapForSet(t *testing.T) {
	set := map[int]bool{}

	set[1] = true

	n := 1

	if set[n] {
		t.Logf("%d is existing", n)
	} else {
		t.Logf("%d is not existing", n)
	}

	set[2] = true
	t.Log(len(set)) // 2

	delete(set, 2)
	t.Log(len(set)) // 1
}
