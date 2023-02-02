package slice_test

import "testing"

func TestSliceInit(t *testing.T) {
	var s0 []int
	t.Log(len(s0), cap(s0)) // 0 0

	s0 = append(s0, 1)
	t.Log(len(s0), cap(s0)) // 1 1

	s1 := []int{1, 2, 3, 4}
	t.Log(len(s1), cap(s1)) // 4 4

	s2 := make([]int, 3, 5)
	t.Log(len(s2), cap(s2)) // 3 5
	// cap 容量，len 可访问元素个数
	// t.Log(s2[0], s2[1], s2[2], s2[3], s2[4]) // index out of range [3] with length 3 [recovered]
	t.Log(s2[0], s2[1], s2[2]) // 0 0 0

	s2 = append(s2, 5)
	t.Log(len(s2), cap(s2))           // 4 5
	t.Log(s2[0], s2[1], s2[2], s2[3]) // 0 0 0 5
}

func TestSliceGrowing(t *testing.T) {
	s := []int{}

	for i := 0; i < 10; i++ {
		s = append(s, i)
		t.Log(len(s), cap(s))
	}
	// 当容量不够时，会乘 2 倍的方式进行扩展
	// 当扩展时，会开启新的存储空间，并将原有空间的元素拷贝到新空间中间
	// 1 1
	// 2 2
	// 3 4
	// 4 4
	// 5 8
	// 6 8
	// 7 8
	// 8 8
	// 9 16
	// 10 16
}

func TestSliceShareMemory(t *testing.T) {
	year := []string{"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}

	Q2 := year[3:6]
	t.Log(Q2, len(Q2), cap(Q2)) // [Apr May Jun] 3 9

	summer := year[5:8]
	t.Log(summer, len(summer), cap(summer)) // [Jun Jul Aug] 3 7

	summer[0] = "Unknow"
	t.Log(Q2)   // [Apr May Unknow]
	t.Log(year) // [Jan Feb Mar Apr May Unknow Jul Aug Sep Oct Nov Dec]
}

func TestSliceComparing(t *testing.T) {
	a := []int{1, 2, 3, 4}
	b := []int{1, 2, 3, 4}

	if a == b { // cannot compare a == b (slice can only be compared to nil)
		t.Log("equal")
	}
}
