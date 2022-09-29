/**
 * @type {string}
 */
let s: string

/**
 * @type {Window}
 */
let win: Window

/**
 * @type {PromiseLike<string>}
 */
let promisedString: PromiseLike<string>

/**
 * @type {HTMLElement}
 */
let element: HTMLElement = document.querySelector(`selector`) as HTMLElement
element.dataset.myData = ''

// ------------------------------------

/**
 * @type {string | boolean}
 */
let sb: string | boolean

// ------------------------------------

/**
 * @type {number[]}
 */
let ns: number[]

/**
 * @type {Array.<number>}
 */
let jsdoc: Array<number>

/**
 * @type {Array<number>}
 */
let nas: Array<number>

// ------------------------------------

/**
 * @type {{ a: string, b: number }}
 */
let var9: { a: string; b: number }

// ------------------------------------

/**
 * @type {Object.<string, number>}
 */
let stringToNumer

/**
 * @type {Object.<number, object>}
 */
let arrayLike: { [n: number]: object }

// ------------------------------------

/**
 * @type {function(string, boolean): number}
 */
let sbn: (arg0: string, arg1: boolean) => number

/**
 * @type {(s: string, b: boolean) => number}
 */
let sbn2: (s: string, b: boolean) => number

// ------------------------------------

/**
 * @type {Function}
 */
let fn7: Function

/**
 * @type {function}
 */
let fn6: Function

// ------------------------------------

/**
 * @type {*}
 */
let star: any

/**
 * @type {?}
 */
let question: any

// ------------------------------------

/**
 * @type {number | string}
 */
let numberOrString: number | string = Math.random() < 0.5 ? 'hello' : 100
let typeAssertedNumber = /** @type {number} */ numberOrString

let one = /** @type {const} */ 1
