# -*- coding: utf8 -*-

import random

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

# ---------------------

str_list = ['welcome', 'to', 'china']
print('-'.join(str_list))

# ---------------------

stu_list = ['heora', 'ben', 'lisa']
for name in stu_list:
  print(name)

stu_list_len = len(stu_list)

i = 0
while i < stu_list_len:
  print(stu_list[i])
  i += 1

# ---------------------

stu_list.append('mike')
stu_list.extend(['a', 'c'])
print(stu_list)

stu_list.insert(3, 'i')
print(stu_list)

print(stu_list.count('a'))

# ---------------------

del stu_list[0]
print(stu_list)

value = stu_list.pop()
print(value)
print(stu_list)

stu_list.remove('mike')
print(stu_list)

# ---------------------

int_data = [3, 1, 5, 2, 4]
int_data.sort()
print(int_data)

int_data.sort(reverse=True)
print(int_data)

int_data.reverse()
print(int_data)

school_names = [
    ['北京大学', '清华大学'],
    ['南开大学', '天津大学', '天津师范大学'],
    ['山东大学', '中国海洋大学']
]
print(school_names[0][1])
print(school_names[1][1])

# ---------------------

"""
random
"""

offices = [
    [], [], []
]
names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

for name in names:
  random_num = random.randint(0, 2)
  offices[random_num].append(name)

print(offices)
