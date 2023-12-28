data = 'abc'
print(data[1])  # b

# ---------------------

data = 'abc'
print(len(data))  # 3
print(data[1:])  # bc
print(data[:1])  # a

# ---------------------

str = 'this is my site, WWW.yueluo.club'

print(str)  # WWW.yueluo.club
print(str.replace('W', 'w'))  # www.yueluo.club
print(str.replace('W', 'w', 1))  # wWW.yueluo.club

print(str.split(" "))  # ['this', 'is', 'my', 'site,', 'WWW.yueluo.club']

# ---------------------

str = 'this is my site, WWW.yueluo.club'
print(str.lower())  # this is my site, www.yueluo.club
print(str.upper())  # THIS IS MY SITE, WWW.YUELUO.CLUB

# ---------------------

str = '   adada   asdad  '
print(str)
print(str.strip())  # adada   asdad
