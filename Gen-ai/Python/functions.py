# ## introduction to functions
# ## Defining a function
# ## Default parameters
# ## Keyword arguments
# ## Variable-length arguments
# ## Return values

# def func_Name(parameters):
#     """Docstring"""
#     # function body
#     return value
# def print_numbers(*args):
#     for num in args:
#         print(num)
# print_numbers(1, 2, 3, 4, 5)

# def print_info(**kwargs):
#     for key, value in kwargs.items():
#         print(key, value)
# print_info(name="John", age=25, city="New York")        

# def print_info(*args, **kwargs):
#     for arg in args:
#         print(arg)
#     for key, value in kwargs.items():
#         print(key, value)
# print_info(1, 2, 3, name="John", age=25, city="New York")   

# def multiply(a,b):
#     return a*b,a      
# print(multiply(2,3))

# ## temperature conversion
# def convert_c_to_f(c):
#     return (c * 9/5) + 32
# def convert_f_to_c(f):
#     return (f - 32) * 5/9
# print(convert_c_to_f(0))
# print(convert_f_to_c(32))