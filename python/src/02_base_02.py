has_money = True
has_friends = False

if has_money:
  print("buy buy buy")
else:
  print("home home home")

# ---------------------

num_1 = 10
num_2 = 20

if num_2 > num_1:
  print(1)
else:
  print(2)

# ---------------------

"""
and or not
"""

print(100 > 50 and 90 < 200)  # True
print(100 > 50 or 90 > 200)  # True
print(not 100 > 50)  # False

# ---------------------

# name = input('请输入用户名：')
# password = input('请输入密码：')

# local_name = 'heora'
# local_passworld = '123456'

# if name == local_name and password == local_passworld:
#   print('login pass')
# else:
#   print('login failed')

# ---------------------

age = 20
gender = '男性'

print(18 <= age <= 50 and gender == '男性')  # True

# ---------------------

print(100 and 200)  # 200
print(100 and 100 > 50)  # True
print(0 and 200)  # 0
print(0 and 100 > 50)  # 0
print([] and 100)  # []

# ---------------------

num = 10

if num < 9:
  print('1')
else:
  print('2')

# ---------------------

ticket = True

if ticket:
  print('go home')
else:
  print('stay home')

# ---------------------

# height = int(input())
# print(type(height))  # <class 'int'>

# ---------------------

i = 1

while i <= 5:
  j = 1
  while j <= i:
    print('*', end='')
    j += 1
  print('\n')
  i += 1

# ---------------------

i = 1

while i <= 9:
  j = 1
  while j <= i:
    print(f'{j * i}', end=' ')
    j += 1
  print('\n')
  i += 1


# ---------------------

for i in range(1, 6):
  print(f'{i}', end=' ')

sum = 0

for i in range(1, 101):
  sum += i
print(sum)
