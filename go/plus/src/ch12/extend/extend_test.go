package extend_test

import (
	"fmt"
	"testing"
)

type Pet struct {
}

func (p *Pet) Speak() {
	fmt.Print(("..."))
}

func (p *Pet) SpeakTo(host string) {
	p.Speak()
	fmt.Println("", host)
}

type Dog struct {
	Pet
}

func (d *Dog) Speak() {
	fmt.Print("Wang!")
}

// func TestGog(t *testing.T) {
// 	 var dog Pet := new(Dog)
// 	dog.SpeakTo("Wang Wang")
// }

func TestDod(t *testing.T) {
	dog := new(Dog)
	dog.SpeakTo("Wang Wang") // ... Wang Wang
}
