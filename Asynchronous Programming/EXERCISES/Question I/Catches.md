## QUESTION I - CATCHES & HINTS
---

1. An `async` function return a promise
2. The `return` inside the `async` function, is the value the promise will be resolved with,  i.e it is the one that is sent to `.then()`
3. The error caught by the `catch()` block, is the one that the promise is rejected with, i.e it is the one that is sent to `.catch()`
4. `.map` can admit the functions (callbacks)
5. If we used `forEach()` instead of `.map()`, the contents of the `usersTodos` objects would be overwritten.
6. `.map()` help us to create a separate array of objects for each of the users.
7. Use `console.dir()` with `{depth: null}` for the console to log deeply nested objects.

> If you use console.log(), the console will capsulate everything in `Object` keyword. This is due to its attempt to save space.