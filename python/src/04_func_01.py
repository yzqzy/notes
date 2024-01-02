from requests import get


def line():
  print('-' * 30)

# ---------------------


def test():
  data = 1 + 1
  print(data)


test()


def print_info():
  print('*' * 33)
  print('*' * 5, '人生苦短, 我用 python', '*' * 5)
  print('*' * 33)


print_info()

line()
# ---------------------

num_1 = 2
num_2 = 5


def add(num_1, num_2):
  print(num_1 + num_2)


add(num_1, num_2)
add(num_2=num_1, num_1=num_2)

line()
# ---------------------


def doc_function():
  """
custom doc func
    :return:none
  """


print(doc_function.__doc__)
print(get.__doc__)

line()
# ---------------------


def add_num(num_1, num_2):
  print("%s+%s=%d" % (num_1, num_2, int(num_1) + int(num_2)))


add(num_2=5, num_1=4)

line()
# ---------------------
