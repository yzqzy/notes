package error_test

import (
	"errors"
	"fmt"
	"strconv"
	"testing"
)

var LessThanTwoError = errors.New("n should be not less than 2")
var LargetThanHundredError = errors.New("n should be not larger than 100")

func getFibonacci(n int) ([]int, error) {
	if n < 2 {
		return nil, LessThanTwoError
	}
	if n > 100 {
		return nil, LargetThanHundredError
	}

	fibList := []int{1, 1}

	for i := 2; i < n; i++ {
		fibList = append(fibList, fibList[i-2]+fibList[i-1])
	}

	return fibList, nil
}

func TestFibonacci(t *testing.T) {
	t.Log(getFibonacci(10)) // [1 1 2 3 5 8 13 21 34 55]

	if v, err := getFibonacci(-10); err != nil {
		if err == LessThanTwoError {
			fmt.Println("It is less.") // It is less.
		}
	} else {
		t.Log(v)
	}
}

func getFibonacci2(str string) {
	var (
		i    int
		err  error
		list []int
	)

	if i, err = strconv.Atoi(str); err == nil {
		if list, err = getFibonacci(i); err == nil {
			fmt.Println(list)
		} else {
			fmt.Println("Error", err)
		}
	} else {
		fmt.Println("Error", err)
	}
}

func getFibonacci3(str string) {
	var (
		i    int
		err  error
		list []int
	)
	if i, err = strconv.Atoi(str); err != nil {
		fmt.Println("Error", err)
		return
	}
	if list, err = getFibonacci(i); err == nil {
		fmt.Println("Error", err)
		return
	}
	fmt.Println(list)
}
