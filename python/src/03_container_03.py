"""
集合中的元素不能是可变对象
不能存储数组，可以存储元组
"""
# set_data = {[1, 2], [3, 4]}

set_data = {(1, 2), (3, 4)}
print(set_data)

print('-' * 30)
# ---------------------

"""
推导式：一种能够快速生成数据的表达式
    [变量 for 变量 in 可迭代对象]
"""

# 生成1-20所有偶数序列（列表推导式）
data_1 = [i for i in range(1, 21) if i % 2 == 0]
print(data_1)  # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

data_2 = [i for i in range(4)]
print(data_2)  # [0, 1, 2, 3]

data_3 = [i for i in range(3, 4)]
print(data_3)  # [3]

data_4 = [i for i in range(1, 21, 4)]
print(data_4)  # [1, 5, 9, 13, 17]

# 元组写法
data_5 = [(x, y) for x in range(1, 3) for y in range(3)]
print(data_5)  # (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]

# 代码分组
a = [x for x in range(1, 101)]
b = [a[x:x+3] for x in range(0, len(a), 3)]
print(b)

print('-' * 30)
# ---------------------

"""
推导式一般生成的是有规律的、连续的序列
"""

# 获取1-10范围内 k 值为当前前序列值 v 是当前 k 值的平方
dict_data = {x: x ** 2 for x in range(1, 11)}
print(dict_data)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25, 6: 36, 7: 49, 8: 64, 9: 81, 10: 100}

dict_data_1 = {x: x + 1 for x in range(1, 11)}
print(dict_data_1)  # {1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11}

print('-' * 30)
# ---------------------

"""
拆包

拆包的过程需要注意两点：
1. 变量位置和元素位置必须一致
2. 变量个数和元素个数必须一致
"""

nums = [1, 2, 3, 4]
num1, num2, num3, num4 = nums
print(num1, num2, num3, num4)  # 1 2 3 4

nums_list = [[1, 2], [3, 4]]
[n1, n2], [n3, n4] = nums_list
print(n1, n2, n3, n4)  # 1 2 3 4

tuple_nums = (1, 2, 3, 4)
num1, num2, num3, num4 = tuple_nums
print(num1, num2, num3, num4)  # 1 2 3 4

set_nums = {1, 2, 3, 4}
num1, num2, num3, num4 = set_nums
print(num1, num2, num3, num4)  # 1 2 3 4

# data = {1, 2, 3}
# num1, num2, num3, num4 = data
# print(num1, num2, num3, num4)  # ValueError: not enough values to unpack

info = {'name': '安娜', 'age': 18}
name, age = info
print(name, age)  # name age
name, age = info.values()
print(name, age)  # 安娜 18

# 字典整体拆包
for k, v in info.items():
  print(k, v)

print('-' * 30)
# ---------------------

"""
交换变量值
"""

a = 4
b = 5
print("a=%d, b=%d" % (a, b))  # a=4, b=5
c = a
a = b
b = c
print("a=%d, b=%d" % (a, b))  # a=5, b=4

a = 4
b = 5
print("a=%d, b=%d" % (a, b))  # a=4, b=5
a = a + b
b = a - b
a = a - b
print("a=%d, b=%d" % (a, b))  # a=5, b=4

a = 4
b = 5
print("a=%d, b=%d" % (a, b))  # a=4, b=5
a, b = b, a
print("a=%d, b=%d" % (a, b))  # a=5, b=4
