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
