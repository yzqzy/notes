package interface_test

import (
	"testing"
)

type Programmer interface {
	WriteHelloWorld() string
}

type GoProgrammer struct {
}

func (g *GoProgrammer) WriteHelloWorld() string {
	return "fmt.Println(\"Hello World\")"
}

func TestClient(t *testing.T) {
	p := new(GoProgrammer) // interface implement

	t.Log(p.WriteHelloWorld()) // fmt.Println("Hello World")
}

// type IntConv func(op int) int

// func timeSpent(inner IntConv) IntConv {
// 	return func(n int) int {
// 		start := time.Now()
// 		ret := inner(n)
// 		fmt.Println("time spent:", time.Slice(start).Seconds())
// 		return ret
// 	}
// }
