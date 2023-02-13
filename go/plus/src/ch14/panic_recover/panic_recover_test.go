package panicrecover_test

import (
	"errors"
	"fmt"
	"testing"
)

func TestPanicVxExit(t *testing.T) {
	defer func() {
		fmt.Println("Finally!")

		if err := recover(); err != nil {
			fmt.Println("recovered from", err) // recovered from Something wrong!
		}
	}()

	fmt.Println("Start")
	// os.Exit(-1)
	panic(errors.New("Something wrong!"))
}
