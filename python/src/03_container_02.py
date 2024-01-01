data = (1, 2, 3)
print(type(data), data)  # <<class 'tuple'>, (1, 2, 3)

data_1 = (1,)
print(type(data_1))  # <class 'tuple'>

data_3 = tuple()
print(type(data_3))  # <class 'tuple'>

nums = (1, 2, 3)
print(nums[0])  # 1

nums_1 = (1, [2], 3)
nums_1[1][0] = 3
print(nums_1)

# ---------------------


def test():
  return 1, 2, 3


print(test())

int_data = (i for i in range(5))
print(list(int_data))

# ---------------------

data = {1, 2, 3, 4}
print(type(data))  # <class 'set'>
print(data)  # {1, 2, 3, 4}

for i in data:
  print(i, end='')
print('\n')

nums = {1, 1, 2, 2, 3, 5, 3, 5}
print(nums)

stu_info = ['安娜', '安娜', '月落']
print(stu_info)
new_stu_ifno = set(stu_info)
print(list(new_stu_ifno))

i = len(nums)
while (i):
  print(nums.pop(), end='')  # pop 方法随机
  i -= 1
print('')

nums.clear()

nums2 = [1, 2, 3, 5]
i = len(nums2)
while (i):
  print(nums2.pop(), end='')  # pop 固定
  i -= 1
print('')

# ---------------------

nums_1 = {1, 2, 3}
nums_2 = {3, 4}
print(nums_1 | nums_2)  # {1, 2, 3, 4}
print(nums_1 & nums_2)  # {3}
print(nums_1 - nums_2)  # {1, 2}

# ---------------------

print('-' * 30)

data_1 = list()
data_2 = tuple()
data_3 = set()
data_4 = dict()
