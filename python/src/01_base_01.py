import keyword

# 单行注释

"""
@author: heora
@time 2023/12/28
@desc 多行注释
"""
print('hello world')

num = 10
print(num)
num = 11
print(num)

num1 = 10
num2 = 20
print(num1 + num2)

# -----------------------------------

"""
计算机中，每种数据类型存储占用的空间是不同的

Numbers
  int、float、long、complex
Boolean
  true、false
String
List 列表
Tuple 元组
Dictionary 字典
Set 集合
"""

# -----------------------------------

print(type(10))  # <class 'int'>

int_data = 10
name = 'heora'
float_data = 3.14

print(type(int_data))  # <class 'int'>
print(type(name))  # <class 'str'>
print(type(float_data))  # <class 'float'>

# -----------------------------------

"""
函数名称 - 小驼峰命名法
类 - 大驼峰命名法
声明变量 下划线命名法
"""

# -----------------------------------

print(keyword.kwlist)
# 'False', 'None', 'True', '__peg_parser__', 'and', 'as', 'assert', 'async', 'await'
# 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for'
# 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass'
# 'raise', 'return', 'try', 'while', 'with', 'yield']


# -----------------------------------

print(10 + 20 + 30)  # 表达式

"""
字符串格式化、占位符
%d 占位整数类型
%s 占位字符串
%f 占位符点数
"""
age = 10
print("我今年%d岁" % age)
age = 10 + 2
print("我今年%d岁" % age)


"""
format
"""
print('今年{}岁'.format(age))

print(f'今年{age}岁')

# -----------------------------------

"""
转义字符
"""

print('abc\nABC')
print(r'abc\nABC')  # r、转义字符失效

print('abc\tABC')  # 制表符

# -----------------------------------

# name = input()
# print(f'output{name}')
# print('output%s' % name)

# -----------------------------------

"""
计算
"""

print(9 / 3)
print(9 % 3)  # 余数
print(9 // 2)  # 取整除
