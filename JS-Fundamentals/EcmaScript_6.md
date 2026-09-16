**Author:** Confy-Code
**Date:** 2026-May-29

---

ES6 - UDACITY NOTES
===

1. **`let`, `const` and `var` keywords** 

* `let` and `const`: block-scoped variable declaration, no hoisting, no redeclaration
* `var`: function-scoped variable declaration, hoisting, redeclaration allowed

---

1. Template literals --> (`${}`)
*Example:*
```javascript
const name = "Alice";
const greeting = `Hello, ${name}!`;
```
---

1. Object literal shorthand (elimination of keyword 'function')
*Example:*
```javascript
const obj = {
  method() {
    console.log("This is a method.");
  }
};

instead of:
const obj = {
  method: function() {
    console.log("This is a method.");
  }
};  
```
---

4. Array properties ==> Array.prototype.decimalfy [TO SEE]

5. Pythonic capitalize() equivalence in JS: 
```javascript
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```
---

6. Rest parameter (2 uses: destructuring an array , variadic functions)
```javascript
// Destructuring an array   
const [first, ...rest] = [1, 2, 3, 4];
// Variadic function
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```
> Destructuring go with square brackets([]) always!
---

7. Arrow functions are always expressions (Arrow function expressions)
8. Arrow functions syntax(concise and block body syntaces)
```javascript
// Concise body syntax
const add = (a, b) => a + b;
// Block body syntax
const add = (a, b) => {
    return a + b;
    };
```
---

9.  JS classes - use static functions for comparing the obj of the 
		same class
> When defining functions in the class we do not use `function` keyword. Using it results into Syntax error
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  static compare(person1, person2) {
    return person1.name === person2.name;
  }
}
```
---

10. "Super" is used to pass variables from child to Parent class
```javascript
// Parent Class
class Parent {
  constructor(familyName, homeCity) {
    this.familyName = familyName;
    this.homeCity = homeCity;
  }

  displayParentInfo() {
    console.log(`Family: ${this.familyName}, City: ${this.homeCity}`);
  }
}

// Child Class
class Child extends Parent {
  constructor(familyName, homeCity, firstName, age) {
    // 1. Pass familyName and homeCity up to the Parent constructor
    super(familyName, homeCity); 
    
    // 2. Initialize Child-specific properties
    this.firstName = firstName;
    this.age = age;
  }

  displayChildInfo() {
    console.log(`Name: ${this.firstName} ${this.familyName}, Age: ${this.age}, From: ${this.homeCity}`);
  }
}

// --- Execution ---
const childInstance = new Child("Confy", "Kigali", "Code", 21);

childInstance.displayParentInfo(); // Output: Family: Confy, City: Kigali
childInstance.displayChildInfo();  // Output: Name: Code Confy, Age: 21, From: Kigali
```
---

11. Symbol(description): Handle duplicate properties in an object.
```javascript
const obj1 = {
  name: "Confy",
  [Symbol("id")]: 123
  [Symbol("id")]: 456
};
```
---

12. `[Symbol.iterator]()`: to simulate linked-lists
```javascript
const arr = [1, 2, 3];
arr_values = arr[Symbol.iterator]();
console.log(arr_values.next()); // { value: 1, done: false }

while(!arr_values.next().done) {
  console.log(arr_values.next().value);
}
```
---

13.  Sets operations: `.add`, `.delete`, `.clear`
14.  Iterate through sets: setIterator & for...of
```javascript
const mySet = new Set([1, 2, 3]);
const setIterator = mySet.values(); 

//using for...of loop
for (const value of mySet) {
  console.log(value);
}

//using setIterator
let result = setIterator.next();

```
> Set.values() returns a SetIterator()
---

15.  Weak sets: Contains only objects (use it for double-deletion of objects)
```javascript
const weakSet = new WeakSet();
let obj1 = { name: "Confy" };
weakSet.add(obj1);
console.log(weakSet.has(obj1)); // true
obj1 = null; // Remove reference to the object
// After garbage collection, the object will be removed from the weak set
```
16.  Garbage collection: automatic memory management, removes unused objects from memory

17.  Map operations: `.set()`, `.delete(key)`, `.clear`, `.has`, `.get`
```javascript
const myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
console.log(myMap.get("key1")); // value1
console.log(myMap.has("key2")); // true
myMap.delete("key1");
myMap.clear();
```
---

18.  Traversing through Map entries: `MapIterator`, `for...of (Destructuring)`, `.forEach()`
```javascript
const myMap = new Map([["key1", "value1"], ["key2", "value2"]]);
// Using MapIterator
const mapIterator = myMap.entries();

// Using for...of loop
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}
// Using .forEach() method
myMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
``` 
---

19.  weakMap(): only object-keys
```javascript
const weakMap = new WeakMap();
let objKey = { name: "Confy" };
weakMap.set(objKey, "This is a value");
console.log(weakMap.get(objKey)); // This is a value
objKey = null; // Remove reference to the object
// After garbage collection, the object and its associated value will be removed from the weak map
```
---

20. Promises: Full structure of a Promises
> In JavaScript, a Promise is an object representing the eventual **completion** or **failure** of an **asynchronous operation**. It acts as a placeholder for a value that is not available immediately but will be in the future, allowing programs to run without freezing while waiting for tasks (like loading/fetch data) to finish.
```javascript
// STEP 1: The JS engine encounters the Promise constructor.
// It immediately pushes the inner executor function onto the Call Stack to run synchronously.
const myPromise = new Promise(function (resolve, reject) {
  
  // STEP 2: A constant variable named 'success' is created in synchronous memory.
  const success = true;

  // STEP 3: setTimeout is called. It hands this callback function to the Web API background environment
  // and starts a 1000ms timer. The executor function then pops off the Call Stack.
  // The 'myPromise' object is now initialized and sitting in a <pending> state.
  setTimeout(function () {
    // STEP 6: 1000ms later, the timer expires. The Web API moves this entire callback function 
    // into the Macrotask Queue. The Event Loop picks it up and pushes it onto the Call Stack.
    
    // STEP 7: Inside the macrotask, 'if (success)' evaluates to true.
    if (success) {
      // The resolve() function is fired. This permanently changes the state of 'myPromise' 
      // from <pending> to <fulfilled>, locking in the value.
      resolve('Ice cream is ready!');
      
      // STEP 8: The moment resolve() fires, JS looks for any attached handlers (.then) 
      // and immediately pushes the success callback function into the high-priority Microtask Queue.
    } else {
      reject('Sorry, no ice cream today.');
    }
  }, 1000);
});

// STEP 4: This runs instantly because it is regular synchronous code.
// Output: Promise { <pending> } (Because the 1000ms timer has barely even started).
console.log(myPromise);

// STEP 5: This registers the success and failure handlers to the promise object.
// Because the promise is still pending, JS stores these functions in memory for later.
// The main script now ends, leaving the Call Stack completely EMPTY.
myPromise.then(
  // This function is the success callback stored in memory
  function (message) {
    // STEP 9: The Event Loop empties the Macrotask Queue, checks the Microtask Queue, 
    // finds this callback, and pushes it onto the Call Stack.
    // Output: Success: Ice cream is ready!
    console.log('Success:', message);
  },
  // This function is the failure callback (ignored in this run because we resolved)
  function (error) {
    console.log('Failed:', error);
  }
);
```
---

22. **PROXY**: An object that stands in front of another object and intercepts operations on it
```javascript
const confy = {status: "looking for a job"};
const handler = {
  get(target, property) {
    if (property === "status") {
      return "hired";
    }
    return target[property];
  }
};
const confyProxy = new Proxy(confy, handler);
console.log(confyProxy.status); // Output: "hired"

// using set trap to intercept property assignment
const handler = {
  set(target, property, value) {
    if (property === "status") {
      console.log("Status cannot be changed.");
      return false; // Prevent the assignment
    }
    target[property] = value; // Allow other properties to be set
    return true;
  }
};
const confyProxy = new Proxy(confy, handler);
confyProxy.status = "hired";
console.log(confyProxy.status); //Output: "Status cannot be changed."
                                //         "looking for a job" (outputs the current value of status property - proving it hasn't changed)

confyProxy.name = "Confy"; // This will work, as it's not the "status" property
console.log(confyProxy.name); // Output: "confy"
```
-- 

**OTHER TRAPS**:

1. The get trap: Intercepts property access.
2. The set trap: Intercepts property assignment.  
3. The has trap: Intercepts the `in` operator.
   ```javascript
   const handler = {
     has(target, property) {
       if (property === "status") {
         return false; // Pretend that the "status" property does not exist
       }
       return property in target; // Default behavior for other properties
     }
   };
    const richardProxy = new Proxy(richard, handler);
    console.log("status" in richardProxy); // Output: false
    console.log("name" in richardProxy); // Output: true (assuming "name" is a property of the target object)
   ```
4. The deleteProperty trap: Intercepts the `delete` operator.
5. The apply trap: Intercepts function calls.
6. The construct trap: Intercepts object instantiation with the `new` operator.
7. The getOwnPropertyDescriptor trap: Intercepts `Object.getOwnPropertyDescriptor()` calls.
8. The ownKeys trap: Intercepts `Object.keys()`, `Object.getOwnPropertyNames()`, ...
---

23. **DIFFERENCE BETWEEN PROXY & GETTER/SETTER**
==> ES5 getter/setter: beforehand defined properties, only intercepts property access and assignment, cannot intercept other operations like function calls or object instantiation.

==> ES6 Proxy: can intercept a wide range of operations (property access, assignment, function calls, object instantiation, etc.), allows for dynamic behavior and more flexible object manipulation.

-----

24. **GENERATORS AND ITERATORS**

- **Generators**: special functions that can be paused and resumed, defined with function* syntax, use yield to produce a sequence of values.
> You can create infinite loops (`while(true){}`) safely because they only calculate the next value when explicitly asked.
```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}
const generator = generatorFunction();
console.log(generator.next()); // { value: 1, done: false }

```
---
- **YIELD** `IN` and `OUT` functions: `yield` can be used to receive input from the caller and also to produce output.
```javascript 
function* generatorFunction() {
  const input = yield "Please provide input";
  console.log("Received input:", input);
  yield "Thank you for the input!";
}
const generator = generatorFunction();
console.log(generator.next()); // { value: "Please provide input", done: false }
console.log(generator.next("Hello, Generator!")); // Logs: "Received input: Hello, Generator!" and returns { value: "Thank you for the input!", done: false }
```
---

1.   **Ecma international:** organization that standardizes JavaScript (ECMAScript) and JSON specifications, ensuring consistency and compatibility across different implementations of JavaScript.

---

26. **specs (specifications)** : detailed documents that define the behavior and features of JavaScript, including syntax, semantics, and APIs. They serve as a reference for developers and implementers of JavaScript engines.

---

27. Each browser maker **(except for Safari)** has a website that tracks its development status.

---

28. **POLYFILL**: a piece of code (usually JavaScript) that implements a feature on web browsers that do not natively support it, allowing developers to use modern features while maintaining compatibility with older browsers.
```javascript
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
```
>1. **Feature Detection (`if (!String.prototype.startsWith)`)**: It checks if the method already exists. If the browser is modern and supports it, the code skips execution to avoid overwriting native, optimized engine performance.
>2. **Fallback Injection**: If the method is missing (e.g., in an legacy browser), it manually adds the `startsWith` function directly to the global `String` prototype.
>3. **Legacy Replication (`this.substr`)**: It recreates the modern behavior using `this.substr()`, an older, universally supported string method to extract and verify the matching text characters.

>This ensures consistent code behavior across all execution environments without breaking older systems.

==> Other Polyfills include: `SVG`, `HTML5`, `Video`, `WebSockets`, etc.
---

29.  **TRANSPILER**: Converts the code from one language version to another, e.g, from ES6 to ES5, allowing developers to use modern JavaScript features while ensuring compatibility with older browsers that may not support those features.

- Example: *Babel* -- a popular JavaScript transpiler that converts ES6+ code into ES5 code, JSX and Flow to JavaScript by using their website.

  To do this, Babel uses plugins and presets that define how specific features like arrow functions should be transformed.

  Plugins and presents can be configured in .babelrc file.

> `Polyfills` and `Transpilers` are one of the popular ways to ensure compatibility between old browsers and modern JavaScript.

--- 







