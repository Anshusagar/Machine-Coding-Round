# fruits = ["apple", "banana", "cherry"]
# print(fruits)
# fruits.append("orange")
# print(fruits)
# fruits.sort()
# print(fruits)
# fruits.reverse()
# print(fruits)
# numbers = [5, 2, 9, 1, 5, 6]
# print(numbers)
# print(numbers[1:3]);
# print(numbers[::2]);
# ##Iterate through a list
# for fruit in fruits:
#     print(fruit)
# ##List comprehension
# squared_numbers = [x**2 for x in numbers]
# print(squared_numbers)  
# ## Iterate through a list with index
# for index, fruit in enumerate(fruits):
#     print(index, fruit)
# ##Check if an item exists in a list
# if "banana" in fruits:
#     print("Banana is in the list")
# ##Get the length of a list
# print(len(fruits))

list = [x**2 for x in range(10)]
print(list)
##Dictionary
student = {"name": "John", "age": 25, "city": "New York"}
print(student)
for key, value in student.items():
    print(key, value);
for key in student.keys():
    print(key)
for value in student.values():
    print(value)
##nested dictionary
student = {"name": "John", "age": 25, "city": "New York", "courses": ["Math", "Science"]}
print(student)
students = {"student1": {"name": "John", "age": 25, "city": "New York"}, "student2": {"name": "Jane", "age": 22, "city": "Los Angeles"}}
print(students)
for key, value in students.items():
    print(key, value)
print(students["student1"]["name"])
## Dictionary comprehension
student = {x: x**2 for x in range(10) if x%2 == 0}
print(student)
numbers = [1,1,1,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5]

frequency = {}
for number in numbers:
    if number in frequency:
        frequency[number] += 1
    else:
        frequency[number] = 1
print(frequency)
  ##Merge two dictionaries
student1 = {"name": "John", "age": 25, "city": "New York"}
student2 = {"name": "Jane", "age": 22, "city": "Los Angeles","courses": ["Math", "Science"]}
student = {**student1, **student2}
print(student)  

    