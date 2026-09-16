## Immediately Invoked Function Expression (IIFE)

A function that is **defined and immediately invoked/called** right away.

Basic syntax:

```javascript
(function () {
    console.log("I run immediately!");
})();
```

The function is created and called immediately — no separate function call is needed.

---

### What can IIFE be used for?

1. **Keep variables out of the global scope**

```javascript
(function () {
    var username = "confy";

    console.log(username);
})();
```

```text
confy
```

But:

```javascript
console.log(username); // ReferenceError
```

`username` exists only inside the IIFE's function scope.

---

2. **Keep variables private**

An IIFE can create private variables and expose only what we want.

```javascript
const counter = (function () {
    let count = 0;

    return {
        increment() {
            count++;
        },

        getCount() {
            return count;
        }
    };
})();

counter.increment();
counter.increment();
counter.increment();

counter.getCount(); // 3

counter.count; // undefined
```

Here, `count` is private.

The outside code can use:

```javascript
counter.increment();
counter.getCount();
```

but cannot directly do:

```javascript
counter.count;
```

The returned methods can still access `count` because they **close over** the variable.

---

### Note

IIFE became especially useful for avoiding problems caused by `var`, because `var` is **function-scoped**, not block-scoped.

So if we wanted `var` variables to stay out of the surrounding/global scope, we could wrap them inside an IIFE.

Without IIFE:

```javascript
if (isEligible) {
    var message = "Student 20000 is eligible to pass the exam";
}

console.log(message);
```

Output:

```text
Student 20000 is eligible to pass the exam
```

This happens because `var` does **not** belong to the `if` block.

The `if` block does not create a scope for `var`.

---

### With IIFE

```javascript
const isEligible = true;

(function () {
    if (isEligible) {
        var message = "Student 20000 is eligible to pass the exam";

        console.log(message);
    }
})();

console.log(message); // ReferenceError
```

The important point is:

```text
IIFE creates a function scope
        ↓
var is function-scoped
        ↓
message belongs to the IIFE
        ↓
message cannot be accessed outside
```

So the `if` block itself is **not** what makes `message` private.

It is the **IIFE's function scope**.

---

### Note: Why the parentheses?

Normally, JavaScript sees:

```javascript
function damn() {
    // ...
}
```

as a **function declaration**.

To turn it into an expression that can be immediately invoked, we commonly wrap it:

```javascript
(function damn() {
    // ...
})();
```

The final:

```javascript
();
```

invokes the function immediately.

That's why they are called:

> **Immediately Invoked Function Expressions**

They are **expressions**, not declarations.

---

### Statements vs Expressions

###@ Statement

A statement tells JavaScript to perform an action.

Example:

```javascript
if (true) {
    console.log("Hello");
}
```

An `if` is a statement.

Quick trick:

```javascript
let x = if (true) {};
```

❌ Invalid JavaScript.

---

### Expression

An expression produces a value.

Examples:

```javascript
let x = 10 - 5;

let name = "Confy";

let result = true ? "Yes" : "No";
```

These can be assigned:

```javascript
let x = 10 - 5; // 5
```

So the simple revision trick is:

```text
Statement  → tells JS what to do
Expression  → produces a value
```

An IIFE is an **expression**, which is why it can be immediately invoked.

---

## Are IIFEs Still Needed Today?

Not usually for basic variable privacy.

Modern JavaScript has `let` and `const`, which are **block-scoped**.

So this already keeps `message` inside the `if` block:

```javascript
if (isEligible) {
    let message = "Student 20000 is eligible to pass the exam";

    console.log(message);
}

console.log(message); // ReferenceError
```

Same with `const`:

```javascript
if (isEligible) {
    const message = "Eligible";

    console.log(message);
}

console.log(message); // ReferenceError
```

So:

```text
var   → function-scoped
let   → block-scoped
const → block-scoped
```

Because of `let` and `const`, **IIFEs are much less necessary just for creating private/local variables**.

They can still be useful in certain situations, but modern JavaScript has better tools for most basic scoping needs.

---

### Final Quick Reminder

```text
IIFE
↓
Define + immediately invoke a function

(function () {
    // private/local variables
})();
```

Main historical purpose:

```text
var
↓
function-scoped
↓
could leak outside blocks
↓
IIFE provided a function scope
```

Modern approach:

```text
let / const
↓
block-scoped
↓
usually no IIFE needed for simple variable isolation
```
