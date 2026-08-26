## Asynchronous Programming — More about Promises

### 1. Promise Chaining

* `.then()` returns a **new Promise**, so `.then()` calls can be chained.
* Return the next Promise from a `.then()` callback to pass its result to the next `.then()`.

Example:

```js
  promise1.then((value) => {
  console.log(value)
  return promise2
  })
  .then((value) => {
  console.log(value)
  return promise3
  })
  .then((value) => {
  console.log(value)
  })
```

* The `value` received by the next `.then()` is the **resolved value of the Promise returned by the previous `.then()`**.
* If you return a normal value instead of a Promise, that value is passed directly to the next `.then()`.

---

## 2. `Promise.all()`

* Runs multiple Promises together and waits for **all of them** to fulfill.
* Returns an array of results in the **same order as the input Promises**.
* If **one Promise rejects, `Promise.all()` rejects immediately**.

Example:

```js
const results = await Promise.all([fetchUsers(), fetchPosts(), fetchComments()
])
.then((value) => console.log(value[0], value[1]) // response for the fetchUsers() and fetchPosts()
.catch((error) => console.log(error)) // logs the response from the promise that is being rejected
```

* Useful when all tasks are required before continuing.
* Think: **"I need everything."**

---

## 3. Promise Executor Function

A Promise executor receives two functions:

```js
const promise = new Promise((resolve, reject) => {
// work
})
```

* First parameter → `resolve`
* Second parameter → `reject`

If you don't need one of the parameters, use `_` as a placeholder:

```js
new Promise((resolve, _) => {
resolve("Done")
})
```

* `_` has no special meaning in JavaScript; it is simply a conventional name meaning **"I don't need this parameter."**

---

## 4. `async` Functions + Promises

* An `async` function **always returns a Promise**.
* Use `await` inside an `async` function to wait for a Promise's result.

Example:

```js
const getData = async() => {
const response = await fetch("/api/data", options) // fetch API will be discussed later
const data = await response.json()}

console.log(data)
```
}

---

## 5. Where to Put `await`

* Put `await` **before a function/expression that returns a Promise**.

Example:
```js 
const response = await fetch("/api/users")

```

* `fetch()` returns a Promise.
* `await` waits for that Promise to settle and gives you its fulfilled value.

Without `await`:

const response = fetch("/api/users")

* `response` is a **Promise**, not the actual response.

> This art of removing and putting `await` is often confusing. [Read More](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/await.md)

---

## 6. Handling Errors with `try...catch`

Use `try...catch` with `async/await` to handle rejected Promises.

Example:

```js
  async function getData() {
  try {
    const response = await fetch("/api/data") // waits till the api is fetched
    const data = await response.json() // waits till the response is parsed into .json format
    
    console.log(data)
} catch (error) {
    console.log("Something went wrong:", error)
  }
}
```

* `try` → code that might fail
* `catch` → handles the error
* A rejected Promise encountered by `await` can be caught by `catch`.

---

## 7. `Promise.race()`

* `Promise.race()` returns the result of the **first Promise to settle (the fastest promise)**.
* "Settle" means either **fulfilled or rejected**.
* Therefore, the fastest Promise does **not necessarily succeed** — a fast rejection can win the race too.

Example:

```js
  const result = await Promise.race([
  request1(),
  request2(),
  request3()
  ])
```

* Think: **"Give me whichever finishes first."**

---

## 8. What `await` Does

* `await` pauses the execution of the **async function** at that point until the Promise settles.
* It does **not freeze the entire JavaScript application/thread**, but pauses the async function alone.
* Once the awaited Promise finishes, the async function continues from where it stopped.

Example:

```js
  async function run() {
    const result = await slowTask()
    console.log("Next task")
    console.log(result)
}
```

* `"Next task"` runs only after `slowTask()` has completed.

---

## 9. Don't Await Everything — Use Promise Chaining / Concurrent Promises

* `await` can make operations execute sequentially when you write them one after another.
* If tasks are independent, start them without immediately awaiting each one.

Sequential:

const users = await getUsers()
const posts = await getPosts()

* `getPosts()` starts only after `getUsers()` finishes.

Better for independent tasks:

const usersPromise = getUsers()
const postsPromise = getPosts()

const users = await usersPromise
const posts = await postsPromise

* Both operations can start without one unnecessarily waiting for the other.
* For multiple independent Promises, `Promise.all()` is often the cleanest approach:

const [users, posts] = await Promise.all([
getUsers(),
getPosts()
])

### Quick Mental Model

* `.then()` → **continue when Promise finishes**
* `return Promise` inside `.then()` → **chain another Promise**
* `Promise.all()` → **wait for everything**
* `Promise.race()` → **first settled Promise wins**
* `async` → **function returns a Promise**
* `await` → **wait for a Promise inside an async function**
* `try...catch` → **handle rejected Promises**
* Independent tasks → **start them together instead of unnecessarily awaiting one before starting another**
