## JavaScript Fetch API 

### 1. Fetch API → HTTP Requests

* `fetch()` is used to make **network/HTTP(S) requests** from JavaScript.
* It is not limited to `http://` — it is commonly used with **HTTPS** as well.
* Default method is **GET**.

Basic GET:

```js
const response = await fetch("/api/users")
const data = await response.json()
```

* `fetch()` returns a **Promise**.
* Therefore, it works naturally with both `.then()` and `async/await`.

---

### 2. POST → Sending Data

* `POST` is commonly used to **send/create data on the server**.
* Use the `method`, `headers`, and `body` options.

Example:

```js
const response = await fetch("/api/users", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
name: "John",
age: 21
})
})

const data = await response.json()
```

##### Remember

* JavaScript object → `JSON.stringify()` → request body
* JSON response → `response.json()` → JavaScript object

---

### 3. `return` vs `resolve()`

* When using `async/await`, use `return` to return a value.
* Don't use `resolve()` unless you are manually creating a Promise within `new Promise()`.

Async function:

```js
const getUser = async () => {
const response = await fetch("/api/user")
return response.json()
}

*Quick Rule*

* `async function` → **`return`**
* `new Promise(...)` → **`resolve()` / `reject()`**

---

### 4.`.then()` vs `async/await`

Both can handle Fetch API Promises:

#### `.then()`

```js
  fetch("/api/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
```

#### `async/await`

```js
async function getUsers() {
try {
const response = await fetch("/api/users")
const data = await response.json()

console.log(data)
} catch (error) {
    console.log(error)
}}
```

* Both approaches are valid.
* For readability, pick one style for a piece of code.
* Avoid unnecessarily mixing `.then()` and `await`.

---

### 5. PUT vs PATCH

## PUT

* Used to **replace/update the whole resource**.
* Think: **"Here is the complete new version of this resource."**
* Fields/columns omitted from a full replacement may be removed or reset, depending on the API.

Example:

```

PUT /users/1

{
"name": "John",
"age": 22,
"email": "[john@example.com](mailto:john@example.com)"
}

```

* Usually send the complete resource representation.

## PATCH

* Used for a **partial update**.
* Only the specified fields are changed.
* Other fields remain unchanged.

Example:

```

PATCH /users/1

{
"age": 22
}
```

* Only `age` is updated.

### Quick Difference

* `PUT` → **replace the resource**
* `PATCH` → **modify part of the resource**

---

# Idempotency

**Idempotent = repeating the same request produces the same intended end state.**

`idem` → same
`potent` → power/effect (from latin word `potens`)

> `GET`, `PUT` and `DELETE` methods are considered **idempotent**, because no matter how many times are they executes, the result will always be the same.

```js
fetch("https://confy-api/1", {
    method: 'GET'
}).then ((response) => response.json) // we will always json format of confy-api no matter how many times we run this.
```

> However, `POST` method is considered non-idempotent.

```js
fetch("https://confy-api", {
    method: 'POST',
    body: {
        {name: "John"}
    }
})
```

>Run once → User #1 created
>Run again → User #2 created (a duplicate though, but a new user)

So repeated requests can produce different state.

### Important

* `PATCH` is **not inherently non-idempotent**.
* A PATCH operation **can be idempotent or non-idempotent depending on what it does**.

---

# DELETE

* `DELETE` is used to remove a resource.

Example:

const response = await fetch("/api/users/5", {
method: "DELETE"
})

if (response.status === 204) {
console.log("User deleted successfully")
}

* HTTP `204 No Content` commonly indicates successful deletion with **no response body**.
* Don't call `response.json()` on a `204` response because there is no JSON body to parse.

---

# Checking Fetch Responses

### Important: `fetch()` does NOT reject just because the server returns 4xx/5xx.

This means:

const response = await fetch("/api/users")

if (!response.ok) {
throw new Error(`HTTP error: ${response.status}`)
}

const data = await response.json()

* `response.ok` → `true` for successful HTTP status codes (`200–299`)
* `response.status` → exact HTTP status code
* `response.statusText` → status description

### Remember

`fetch()` rejection usually means a **network-level failure**.

An HTTP error such as `404` or `500` still gives you a Response object (as 404 or 500 is still a response, an error response), so check `response.ok` or `response.status`.

---

### Common Fetch Pitfalls

* Forgetting to Parse JSON

* Not Checking the Response Status

* Forgetting `JSON.stringify()`

* Forgetting the Content-Type

* Trying to Parse an Empty Response

> Some responses, especially `204 No Content`, have no body.

---

### Quick Fetch Template

```js

async function createUser() {
try {
const response = await fetch("/api/users", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
name: "John",
age: 21
})
})


if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
}

const data = await response.json()
console.log(data)

} catch (error) {
console.error(error)
}
```

}

# Quick Mental Model

* `fetch(url)` → **GET by default**
* `POST` → **send/create data**
* `GET` → **retrieve data**
* `PUT` → **replace/update whole resource**
* `PATCH` → **partially update resource**
* `DELETE` → **remove resource**
* `fetch()` → **returns a Promise**
* `response.json()` → **parse JSON body**
* `response.ok` → **check 2xx success**
* `response.status` → **get exact HTTP status**
* `204` → **success with no response body**
* `JSON.stringify()` → **JS object → JSON string**
* `async/await` → **clean way to consume Fetch Promises**
* `POST` → **usually non-idempotent**
* `GET`, `PUT`, `DELETE` → **idempotent**
* `PATCH` → **depends on the operation**
