$ = 'constructor'
$$ = 'console.log(1)'
$_ = ~[] // 0 按位取反即 -1

$_[$][$]($$)()

// =>
;(0)['constructor']['constructor']('console.log(1)')()
// =>
Function('console.log(1)')()
