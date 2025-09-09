# Answer to the questions

## 1. What is the difference between var, let, and const?
var is use to declare a variable in javascript. It creates a function scope variable in the js file. var can be reassign or redeclare, However, let and const replaced the old approach, using var to create a varaible. let creates a block scope variable. any variable declared using let cannot be redeclare, but reassign is allowed. ON the other hand, const create a constant variable which is also block scope, but it does not allow reassign or redeclare.

## 2. What is the difference between map(), forEach(), and filter()?
three of them are array methods. map functin return a new modified array, while forEach is used to perform some operation using each elements but it does not return anything. filter is used to create a new array that pass the given condition.

## 3. What are arrow functions in ES6?
arrow function is a special type of function introduced in ES6. here you dont need to use function keyword. simply using parenthesis and => allows you to right a function, simpler approach then traditional function declaration.
example, 
- (number) => number * number

## 4. How does destructuring assignment work in ES6?
destructuring assignment is usued to extract values from a object, where you can get specific value from a object. if anyone need some part or few keys of a object he can use destructuring technique. key name can be changed while destructuring an element. destructuring is also avaible in array. 
example, 
- const {fullname: name} = person;
- const [first] = [1,2,3] 

## 5 Explain template literals in ES6. How are they different from string concatenation?
using string concatenation, it is very hard to merge long string and variables in js. it required additon operator (+) multiple times. ES6 introduced a new approach called template literals which makes it easier to create a string, which can be dynamic by using ${variable_name} in it. Major update is that it supports multiline string.
example,
- const message = `welcome ${name}`;