package client_test

import (
	"plus/src/ch15/series"
	"testing"
)

func TestPackage(t *testing.T) {
	t.Log(series.GetFibonacciSeries(5)) // [1 1 2 3 5]
}
