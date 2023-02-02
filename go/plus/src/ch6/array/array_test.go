package array__test

import "testing"

func TestArrayInit(t *testing.T) {
	var arr [3]int
	arr1 := [4]int{1, 2, 3, 4}
	arr3 := [...]int{1, 2, 3, 4, 5}

	arr1[1] = 6

	t.Log(arr[1], arr[2]) // 0 0
	t.Log(arr1)           // [1, 6, 3, 4]
	t.Log(arr3)           // [1, 2, 3, 4, 5]
}

func TestArrayTravel(t *testing.T) {
	arr := [...]int{1, 3, 4, 5}

	// 1. method1
	for i := 0; i < len(arr); i++ {
		t.Log((arr[i]))
	}

	// 2. method2
	for idx, e := range arr {
		t.Log(idx, e)
	}

	// 3. method3
	for _, e := range arr {
		t.Log(e)
	}
}

func TestArraySection(t *testing.T) {
	arr := [...]int{1, 2, 3, 4, 5}

	t.Log(arr[:3]) // [1 2 3]
	t.Log(arr[3:]) // [4 5]
	t.Log(arr[:])  // [1 2 3 4 5]
}
