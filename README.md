1) Difference between var, let, and const
var: Function-scoped, can be redeclared and updated.
let: Block-scoped, can be updated but not redeclared.
const: Block-scoped, cannot be updated or redeclared.

2) Difference between map(), forEach(), and filter()
map(): Returns a new array after applying a function to each element.
forEach(): Executes a function on each element, does not return a new array.
filter(): Returns a new array with elements that pass a condition.

3) Arrow function is a small syntax of functions() which was introduced in ES6

4) Destructuring assignment in ES6
Extract values from arrays/objects into variables:
const [a, b] = [1, 2]; // array
const {name, age} = {name: "Adeeb", age: 20}; // object

5) Template literals in ES6
Use backticks ` ` for strings with variables and multi-line
const name = "Ali";
console.log(`Hello ${name}`);
