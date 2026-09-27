## JAVASCRIPT - EVENT LOOP

> Try predicting the outputs of these code snippets if you really think you understand Event Loop :)

### 1. Single-Threaded Problem

JavaScript is single-threaded, so it has one main call stack.

- Heavy/slow asynchronous operations can be handled externally by the browser/runtime (e.g. Web APIs), allowing JavaScript to continue executing other code.

- When an asynchronous operation is started, the operation is handled by an external runtime while the current synchronous JavaScript execution continues/finishes.

### 2. Event Loop

The event loop coordinates when queued asynchronous callbacks/continuations can execute.

General order:

1. Execute all synchronous code.
2. When the call stack is empty, drain ALL microtasks.
3. Run ONE task from the task/macrotask queue.
4. Drain ALL microtasks again.
5. Run the next task.
6. Repeat.

The event loop does not interrupt currently running synchronous code.

### 3. Web APIs

Browser APIs can generally be callback-based, Promise-based, or synchronous.

- **Callback-based examples**: `setTimeout()`, DOM events, Geolocation API (`navigator.geolocation.getCurrentPosition()`).

> Some callback-based APIs like Geolocation, can be converted into Promise-based APIs.

- **Promise-based examples**: `fetch()`.

- **Synchronous browser API example**: `prompt()` that accepts an input from the user.

Not every asynchronous operation simply "goes into the task queue"; the scheduling mechanism depends on the API.

### 4. Callback-Based APIs

- `setTimeout()` registers a timer and returns immediately.

- The timer is handled externally. When its delay has elapsed, its callback becomes eligible to be executed as a task.

- The callback still has to wait for the current synchronous code and relevant microtasks to finish.

- Therefore, the delay in `setTimeout()` is **a minimum delay**, not an exact execution time.

- Callback-based browser callbacks are generally handled through the task/macrotask mechanism.

### 5. Promise Executor

- The Promise executor runs synchronously.

```js
new Promise((resolve, reject) => { ... })
```

- The executor runs immediately when the Promise is created.

- However, `.then()`, `.catch()`, and `.finally()` callbacks are scheduled as microtasks.

> Promise executor → synchronous.

> Promise reaction callbacks → microtasks.

### 6. async/await

- Code before `await` runs synchronously.

- The continuation after `await` is scheduled as a microtask.

- `await` does not block the entire JavaScript thread; it only pauses that async function.

**But what is considered as Synchronous Code ?**

> `console.log()`, Normal function calls, Promise executors, Code before `await`, ...

Synchronous code executes immediately on the call stack.

> The event loop cannot process queued asynchronous callbacks while synchronous code is still running.

**What is considered as Microtasks ?**

> `Promise.then()`, `Promise.catch()`, `Promise.finally()`, `async/await` continuations

Microtasks are processed after the current synchronous execution finishes.

### 9. Microtask Starvation

Microtask starvation occurs when microtasks continuously create more microtasks.

Example idea:
```js
function loop(){
    queueMicrotask(loop);
}

loop()

setTimeout(() => console.log("I will starve"), 0)
```

This can cause timers and other tasks to be delayed indefinitely.

---

Learn Event Loop Concept further with these recommended YouTube Tutorials:

- [12 Minute-tutorial from Lydia Hallie](https://www.youtube.com/watch?v=eiC58R16hb8&feature=youtu.be)
- [41 Minute-tutorial from Akshay Saini](https://www.youtube.com/watch?v=8zKuNo4ay8E)
