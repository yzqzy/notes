package map_test

import "testing"

func TestInitMap(t *testing.T) {
	m1 := map[int]int{1: 1, 2: 4, 3: 9}
	t.Log(m1[2])                 // 4
	t.Logf("len m1=%d", len(m1)) // len m1=3

	m2 := map[int]int{}
	m2[4] = 16
	t.Logf("len m2=%d", len(m2)) // len m2=1

	m3 := make(map[int]int, 10)
	t.Logf("len m3=%d", len(m3)) // len m3=0
}

func TestAccessNotExistingKey(t *testing.T) {
	m1 := map[int]int{}
	t.Log(m1[1]) // 0

	m1[2] = 0
	t.Log(m1[1]) // 0

	// 无法区分不存在值或实际值为 0
	// 需要自主判断

	// m1[3] = 0

	if _, ok := m1[3]; ok {
		t.Logf("key 3 value is %d", m1[3])
	} else {
		t.Log("key 3 is not existing.")
	}
}

func TestTravelMap(t *testing.T) {
	m1 := map[int]int{1: 1, 2: 4, 3: 9}

	for k, v := range m1 {
		t.Log(k, v)
		// 1 1
		// 2 4
		// 3 9
	}
}
