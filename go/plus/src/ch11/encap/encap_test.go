package encap

import (
	"fmt"
	"testing"
)

type Employee struct {
	Id   string
	Name string
	Age  int
}

func TestCreateEmployeeObj(t *testing.T) {
	e1 := Employee{"0", "Bob", 20}
	e2 := Employee{Name: "Mike", Age: 25}
	e3 := new(Employee) // 返回指针

	e3.Id = "3"
	e3.Age = 22
	e3.Name = "Rose"

	t.Log(e1)              // {0 Bob 20}
	t.Log(e2)              // { Mike 25}
	t.Log(e2.Id)           //
	t.Log(e3)              // &{3 Rose 22}
	t.Logf("e2 is %T", e2) // e2 is encap.Employee
	t.Logf("e3 is %T", e3) // e3 is *encap.Employee
}

func (e Employee) String1() string {
	return fmt.Sprintf("ID:%s-Name:%s-Age:%d", e.Id, e.Name, e.Age)
}

func (e *Employee) String2() string {
	return fmt.Sprintf("ID:%s-Name:%s-Age:%d", e.Id, e.Name, e.Age)
}

func TestStructOperations(t *testing.T) {
	e1 := Employee{"0", "Bob", 20}
	t.Log(e1.String1()) // ID:0-Name:Bob-Age:20

	e2 := &Employee{"0", "Bob", 20}
	t.Log(e2.String2()) // D:0-Name:Bob-Age:20
}
