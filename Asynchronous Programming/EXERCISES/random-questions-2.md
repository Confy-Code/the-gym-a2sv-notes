## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - RANDOM QUESTIONS 2

---

**1. When does try/catch capture async errors and when does it not?**
---

The important rule:

> `try/catch` catches synchronous errors and asynchronous Promise rejections **when the Promise is `await`ed inside the try block**.

Example:

```js
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Something went wrong:", error);
    }
}
```

If `fetch()` rejects, the `await` turns that rejection into an exception that `catch` can handle.

> Without `await`, the rejections (later exceptions) will not be handled by `catch`

> After `catch` block, there can be added a `finally` block, that executes for no matter what is run between `try` and `catch` blocks.

---

**2. What is the difference between `f2 and f3` in the following expression: `promiseInstance.then(f1, f2).catch(f3)`?**
---


- `f1` runs if the original Promise fulfills.

- `f2` runs if the **original Promise rejects**.

> Remember from [chaining_thenables.md file](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/chaining_thenables.md) the overall structure of `then` is `then(success-handler, reject-handler)`?


Important:

`f2` does NOT catch every possible error occurring in `f1`, as they are on the same chain level.

> The error thrown by `f1` goes to the next rejection handler

**WHY MULTIPLE CATCH CLAUSES like `promise.catch(f1).catch(f2).catch(f3)` ?**
---

Multiple `.catch()` calls are useful for **different levels of error handling and recovery**. A `catch` can either **recover**(by returning value), or **re-throw** the new error (by `throw` keyword).

**Structure:**

```text
Promise rejects
      ↓
catch(f1)
      ↓
   recover?
   /      \
 yes       no
 ↓         ↓
continue   throw
           ↓
       catch(f2)
           ↓
       recover?
           ↓
       catch(f3)
```

This allows different handlers to deal with different kinds of failures.

---

**What is the difference between parallelism and concurrency in JavaScript?**
---

1. Concurrency

Concurrency means multiple tasks can **make progress during overlapping periods of time**.

> "Multiple tasks are being managed at the same time."

JavaScript's main thread is single-threaded, but it achieves concurrency through mechanisms such as **event loop**, ...

> Remember `event loop` in [EcmaScript_6.md file](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/EcmaScript_6.md)

Example:

```js
const p1 = fetch(url1);
const p2 = fetch(url2);

const results = await Promise.all([p1, p2]);
```

> The requests can be in progress at the same time even though JavaScript itself has one main execution thread.
---

2. Parallelism

Parallelism means tasks are actually executing **simultaneously on multiple processing threads/cores**.

JavaScript can achieve this using **Web Workers**, ...

> "Multiple tasks are actually executing at the same time."

---

### 3. What is AJAX?

> AJAX stands for **Asynchronous JavaScript and XML**

It is a technique for making asynchronous requests to a server **without requiring a full page reload**.

- The word **XML** is historical.
- AJAX does NOT require XML anymore.

Modern AJAX-style applications commonly use `JSON`, `Fetch API`, ...


#### 4. How does hoisting relate to the execution context?

Hoisting is closely related to how JavaScript creates an **execution context before executing the code**.

When JavaScript executes code, it first creates an `execution context`.
During this setup phase, JavaScript registers declarations.

Example:

```js
console.log(x);

var x = 10;
```

This behaves approximately like:

```js
var x; // It is hoisted

console.log(x); // undefined

x = 10;
```

The declaration was processed during the creation phase.

---

#### Function declarations

Function declarations are also available before their textual position:

```js
sayHello();

function sayHello() {
    console.log("Hello");
}
```

This works because the function declaration is made available during the execution-context setup.

---

#### let and const

`let` and `const` are also `hoisted` in the sense that their bindings are created during the setup phase, but they are placed in the:

> **Temporal Dead Zone (TDZ)**

until execution reaches their declaration.

```js
console.log(x); // ReferenceError

let x = 10;
```

So avoid saying:

> "let and const are not hoisted."

A better explanation is:

> `let` and `const` are hoisted, but they cannot be accessed before initialization because they are in the Temporal Dead Zone.

---

### 5. What is event-driven programming?

=============================

Event-driven programming is a programming model where the flow of the program is determined by **events** like `click, mouse movement, ...`

---

### 6. How does closure relate to the execution context?

===================================

A **closure** occurs when a function remembers and can access variables from its parent's **lexical** environment, even after the outer(parent)  function has finished executing.

Example:

```js
function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const increment = outer();

increment(); // 1
increment(); // 2
increment(); // 3
```
---

JavaScript Engine attaches the `[[ENVIRONMENT]]` property to the inner function; this property is pointing to the parent's lexical environment in **heap memory**

> Function may be popped off the call stack upon its execution (return), but its environment remain in heap memory (memory assigned after creation)

- The execution context represents the current execution of code.
  
- The lexical environment is the structure that stores/links bindings and their outer environments.
- A closure allows an inner function to retain access to an outer lexical environment, using the `[[ENVIRONMENT]]`` property.
- A function is popped of the callstack if it returns (execution context), and its environment is garbage collected (Lexical environment - but remains in heap memory)
- Closure: comes when inner function calls the variables in
outer function (reference to outer function)
- JS engine attaches the [[Environment]] property to the inner function; it points to the actual heap memory of the Outer function

> heap memory: JS engine stores here variables that it sees may be used later
- Even if the parent dies, the inner function still have its variables
- This is a closure

---
