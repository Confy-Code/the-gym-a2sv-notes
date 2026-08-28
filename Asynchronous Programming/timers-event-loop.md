## ASYNCHRONOUS PROGRAMMING - setTimeout, setInterval & Event Loop

### 1. `setTimeout()`

```javascript
setTimeout(callback, delay);
```

* Executes `callback` **once** after the specified delay.
* Delay is a **minimum wait time**, not a guarantee of exact execution time.
* Returns a **numeric timeout ID**.
* The ID can be used with `clearTimeout()` to avoid memory leaks, ...

```javascript
const timeoutID = setTimeout(() => {
    console.log("Runs once");
}, 2000);

clearTimeout(timeoutID);
```

---

## 2. `setInterval()`

```javascript
setInterval(callback, interval);
```

* Executes `callback` **repeatedly** at approximately every `interval` milliseconds.
* Continues until `clearInterval()` is called.
* Returns a **numeric interval ID**.
* The ID can be used with `clearInterval()`.

```javascript
const intervalID = setInterval(() => {
    console.log("Runs repeatedly");
}, 2000);

clearInterval(intervalID);
```

### Example: Stop after 5 executions

```javascript
function timer(callback, interval, maxRuns) {
    let count = 0;

    const intervalID = setInterval(() => {
        count++;
        callback(count);

        if (count === maxRuns) {
            clearInterval(intervalID);
        }
    }, interval);
}

// calling the function

timer(
    count => console.log(`Execution #${count}`), // callback
    2000, // interval
    5 //maxRuns
);
```

> Both timers goes in the category of Macrotasks/ So they execute later than the Microtasks (Promise.then(), ...) in the Event loop.

> See About the event loop in sections below

---

## 3. `clearTimeout()` vs `clearInterval()`

| Method              | Purpose                            |
| ------------------- | ---------------------------------- |
| `clearTimeout(id)`  | Cancels a scheduled `setTimeout()` |
| `clearInterval(id)` | Stops a running `setInterval()`    |

Both use the ID returned by their corresponding timer.

---

# Event Loop

JavaScript executes synchronous code first.

### General flow

```text
Synchronous Code
      ↓
Call Stack
      ↓
Web/Browser APIs
      ↓
Task Queue / Microtask Queue
      ↓
Event Loop
      ↓
Call Stack
```

### Important execution order

**1. Synchronous code runs first**

```javascript
console.log("Sync");
```

**2. Microtasks run next**

Examples:

* `Promise.then()`
* `Promise.catch()`
* `Promise.finally()`

**3. Macrotasks/tasks run afterward**

Examples:

* `setTimeout()`
* `setInterval()`
* DOM events

### Example

```javascript
setInterval(() => {
    console.log("Interval");
}, 2000);

Promise.resolve()
    .then(() => console.log("Microtask"));

console.log("Synchronous");
```

Output begins:

```text
Synchronous
Microtask
Interval
```


### Remember

* `setTimeout()` → **run once later**
* `setInterval()` → **run repeatedly later**
* Both return an **ID**
* `clearTimeout()` → cancel timeout
* `clearInterval()` → stop interval
* Promise callbacks → **microtasks**
* Timers → **macrotasks/tasks**
* **Microtasks are processed before the next macrotask**
* Timer delays specify **when a callback becomes eligible**, not when it is guaranteed to execute.
