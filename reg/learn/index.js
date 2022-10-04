const str = 'Understand? OK or NOT'

console.log(str.match(/OK/)) // [ 'OK', index: 12, input: 'Understand? OK or NOT', groups: undefined ]
console.log(str.match(/ok/i)) // [ 'OK', index: 12, input: 'Understand? OK or NOT', groups: undefined ]

console.log('-----------------------------------------')

const strArr = ['readme.md', 'document.pdf', 'image.png', 'music.mp4', 'manual.pdf']

strArr.forEach(str => {
  console.log(str.match(/^\w+\.pdf$/))
})
// null
// [ 'document.pdf', index: 0, input: 'document.pdf', groups: undefined ]
// null
// null
// [ 'manual.pdf', index: 0, input: 'manual.pdf', groups: undefined ]

console.log('-----------------------------------------')

const str2 = `
  “I have no special talents. I am only passionately curious.”

  ― Albert Einstein
`

console.log(str2.match(/curious/gm)) // [ 'curious' ]

console.log('-----------------------------------------')

const str3 = 'abcABC123 .:!?'

console.log(str3.match(/./g)) // ['a', 'b', 'c', 'A', 'B', 'C', '1', '2', '3', ' ', '.', ':', '!', '?']

console.log('-----------------------------------------')

const str4 = 'bar ber bir bor bur'

console.log(str4.match(/b[aeiou]r/)) // [ 'bar', index: 0, input: 'bar ber bir bor bur', groups: undefined ]
console.log(str4.match(/b[aeiou]r/g)) // [ 'bar', 'ber', 'bir', 'bor', 'bur' ]

console.log('-----------------------------------------')

const str5 = 'bar ber bir bor bur'

console.log(str5.match(/b[^eo]r/g)) //  'bar', 'bir', 'bur' ]
console.log(str5.match(/^bar/)) // [ 'bar', index: 0, input: 'bar ber bir bor bur', groups: undefined ]

console.log('-----------------------------------------')

const str6 = 'abcdefghijklmnopqrstuvwxyz'

console.log(str6.match(/[e-o]/g)) // ['e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o']

console.log('-----------------------------------------')

const str7 = '0123456789'

console.log(str7.match(/[3-6]/g)) // [ '3', '4', '5', '6' ]

console.log('-----------------------------------------')

const str8 = 'br ber beer'

console.log(str8.match(/be*r/g)) // [ 'br', 'ber', 'beer' ]

console.log('-----------------------------------------')

const str9 = 'br ber beer'

console.log(str9.match(/be+r/g)) // [ 'ber', 'beer' ]

console.log('-----------------------------------------')

const str10 = 'color, colour'

console.log(str10.match(/colou?r/g)) // [ 'color', 'colour' ]
console.log(str10.match(/colou*r/g)) // [ 'color', 'colour' ]

const str11 = 'color, colouuur'

console.log(str11.match(/colou?r/g)) // [ 'color' ]
console.log(str11.match(/colou*r/g)) // [ 'color', 'colour' ]

console.log('-----------------------------------------')

const str12 = 'ber beer beeer beeeer'

console.log(str12.match(/be{2}r/g)) // [ 'beer' ]
console.log(str12.match(/be{3}r/g)) // [ 'beeer' ]

console.log('-----------------------------------------')

const str13 = 'ber beer beeer beeeer'

console.log(str13.match(/be{3,}r/g)) // [ 'beeer', 'beeeer' ]

console.log('-----------------------------------------')

const str14 = 'ber beer beeer beeeer'

console.log(str14.match(/be{1,3}r/g)) // [ 'ber', 'beer', 'beeer' ]

console.log('-----------------------------------------')

const str15 = 'ha-ha,haa-haa'

console.log(str15.match(/(haa)/g)) // [ 'haa', 'haa' ]

console.log('-----------------------------------------')

const str16 = 'ha-ha,haa-haa'
const str17 = 'ha-ha-ha,haa-haa'

console.log(str16.match(/(ha)-\1,(haa)-\2/g)) // [ 'ha-ha,haa-haa' ]
console.log(str17.match(/(ha)-\1-\1,(haa)-\2/g)) // [ 'ha-ha-ha,haa-haa' ]

console.log('-----------------------------------------')

const str18 = 'ha-ha,haa-haa'

console.log(str18.match(/(?:ha)-ha,(haa)-\1/g)) // [ 'ha-ha,haa-haa' ]

console.log('-----------------------------------------')

const str19 = 'cat Cat rat'

console.log(str19.match(/(c|C)at/g)) // [ 'cat', 'Cat' ]
console.log(str19.match(/(c|C)at|rat/g)) // [ 'cat', 'Cat', 'rat' ]
console.log(str19.match(/[cCr]at/g)) // [ 'cat', 'Cat', 'rat' ]

console.log('-----------------------------------------')

const str20 = '(*) Asterisk.'

console.log(str20.match(/(\*|\.)/g)) // [ '*', '.' ]

console.log('-----------------------------------------')

const str21 = `
Basic Omellette Recipe

1. 3 eggs, beaten
2. 1 tsp sunflower oil
3. 1 tsp butter
`

console.log(str21.match(/^[0-9]/gm)) // [ '1', '2', '3' ]

console.log('-----------------------------------------')

const str22 = `
  https://domain.com/what-is-html.html
  https://otherdomain.com/html-elements
  https://website.com/html5-features.html
`

console.log(str22.match(/html$/gm)) // [ 'html', 'html' ]

console.log('-----------------------------------------')

const str23 = 'abcABC123 _.:!?'

console.log(str23.match(/\w/g)) // ['a', 'b', 'c', 'A', 'B', 'C', '1', '2', '3', '_']

console.log('-----------------------------------------')

const str24 = 'abcABC123 _.:!?'

console.log(str24.match(/\W/g)) // [ ' ', '.', ':', '!', '?' ]

console.log('-----------------------------------------')

const str25 = 'abcABC123 .:!?'

console.log(str25.match(/\d/g)) // [ '1', '2', '3' ]

console.log('-----------------------------------------')

const str26 = 'abcABC123 .:!?'

console.log(str26.match(/\D/g)) // ['a', 'b', 'c', 'A', 'B', 'C', ' ', '.', ':', '!', '?']

console.log('-----------------------------------------')

const str27 = 'abcABC123 .:!?'

console.log(str27.match(/\s/g)) // [ ' ' ]

console.log('-----------------------------------------')

const str28 = 'abcABC123 .:!?'

console.log(str28.match(/\S/g)) // ['a', 'b', 'c', 'A', 'B', 'C', '1', '2', '3', '.', ':', '!', '?']

console.log('-----------------------------------------')

const str29 = 'Date: 4 Aug 3PM'

console.log(str29.match(/\d+/g)) // [ '4', '3' ]
console.log(str29.match(/\d+(?=PM)/g)) // [ '3' ]

console.log('-----------------------------------------')

const str30 = 'Date: 4 Aug 3PM'

console.log(str30.match(/\d+/g)) // [ '4', '3' ]
console.log(str30.match(/\d+(?!PM)/g)) // [ '4' ]

console.log('-----------------------------------------')

const str31 = 'Product Code: 1064 Price: $5'

console.log(str31.match(/(?<=\$)\d+/g)) // [ '5' ]

console.log('-----------------------------------------')

const str32 = 'Product Code: 1064 Price: $5'

console.log(str32.match(/(?<!\$)\d+/g)) // [ '1064' ]

console.log('-----------------------------------------')

const str33 = 'domain.com, test.com, site.com'

console.log(str33.match(/\w+\.com/)) // ['domain.com']
console.log(str33.match(/\w+\.com/g)) // [ 'domain.com', 'test.com', 'site.com' ]

console.log('-----------------------------------------')

const str34 = `
  domain.com
  test.com
  site.com
`

console.log(str34.match(/\w+\.com$/)) // null
console.log(str34.match(/\w+\.com$/gm)) // [ 'domain.com', 'test.com', 'site.com' ]

console.log('-----------------------------------------')

const str35 = `
  DOMAIN.COM
  TEST.COM
  SITE.COM
`

console.log(str35.match(/\w+\.com$/gm)) // null
console.log(str35.match(/\w+\.com$/gim)) // [ 'DOMAIN.COM', 'TEST.COM', 'SITE.COM' ]

console.log('-----------------------------------------')

const str36 = 'ber beer beeer beeeer'

console.log(str36.match(/.*r/)) // ['ber beer beeer beeeer']

console.log('-----------------------------------------')

const str37 = 'ber beer beeer beeeer'

console.log(str37.match(/.*?r/)) // ['ber']

console.log('-----------------------------------------')
console.log('-----------------------------------------')
