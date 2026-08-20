## Asynchronous Programming - Promises

> A **Promise** represents the eventual (failure or success) result of an asynchronous operation.

### 1. Promise States

A Promise has three actual states:

| State         | Meaning                              |
| ------------- | ------------------------------------ |
| **Pending**   | The operation has not finished yet   |
| **Fulfilled** | The operation completed successfully |
| **Rejected**  | The operation failed                 |

Once a Promise becomes fulfilled or rejected, it is **settled**.

> **Settled = fulfilled OR rejected**

A Promise can be **settled only once**. Its state cannot change afterward.

### 2. Promise Flow

```text
                 ┌─── Fulfilled ───→ .then()
Pending ─────────┤
                 └─── Rejected ────→ .catch()

          Fulfilled / Rejected
                  ↓
               Settled
```

> `setTimeout()` does **not** represent a Promise state. It is simply one possible way of creating a delayed asynchronous operation.

---

## 3. `.then()` and `.catch()`

```javascript
promise
    .then(result => {
        // handle successful result
    })
    .catch(error => {
        // handle error
    });
```

* `.then()` handles a **fulfilled** Promise.
* `.catch()` handles a **rejected** Promise.
* The value passed to `resolve(value)` becomes the argument received by `.then()`.
* The value passed to `reject(error)` becomes the argument received by `.catch()`.

```javascript
resolve("Success");
// → .then(value => ...) receives "Success"

reject("Something went wrong");
// → .catch(error => ...) receives "Something went wrong"
```

If `resolve()` or `reject()` receives no value, the corresponding callback receives `undefined`.

### 4. Why Promises Help

Promises make sequential asynchronous operations easier to read and help avoid deeply nested callbacks known as the **Pyramid of Doom / Callback Hell**.

```text
Callbacks:
operation()
   └── callback()
       └── callback()
           └── callback()

Promises:
operation()
   → .then()
   → .then()
   → .then()
   → .catch()
```

---

## 5. Promises vs Events

### Promise

* Represents **one eventual result**.
* Settles only once.
* A `.then()` handler can be attached even **after** the Promise has already settled; it will still receive the result.

### Event

* Represents something that can happen **multiple times**.
* An event can fire repeatedly.
* A listener generally needs to be registered before the event occurs to respond to that particular firing.

```text
Promise → one result → settle once

Event   → many occurrences → can fire repeatedly
```

**Rule of thumb:**

> Use a **Promise** for one eventual result; use an **Event** for repeated occurrences.

---

## 6. `this` Inside Promise Callbacks

Do not assume that `this` inside a Promise callback refers to the Promise itself.

```javascript
new Promise(function(resolve, reject) {
    console.log(this);
});
```

The regular `function` has its own `this` behavior; the Promise does **not** automatically become `this`.

In browsers, depending on how the function is invoked and strict mode, `this` may be the global object (`window`) or `undefined`.

> **Key idea:** A Promise does not automatically bind `this` to itself.

---
