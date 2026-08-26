# `await` vs. No `await` Quick Reference

> **Rule of Thumb:** Without `await`, you hold a **Promise (a pending container)**. With `await`, you get the **unwrapped value** inside.

---

### 1. Daily JavaScript Operations

| Operation / Code | WITHOUT `await` | WITH `await` |
| :--- | :--- | :--- |
| **`fetch('/api/user')`** | `Promise { <pending> }` | `Response` object |
| **`response.json()`** | `Promise { <pending> }` | JS `Object` or `Array` |
| **`response.text()`** | `Promise { <pending> }` | `string` |
| **`Promise.all([p1, p2])`** | `Promise { <pending> }` | Array of values: `[val1, val2]` |
| **`Promise.allSettled([p1, p2])`** | `Promise { <pending> }` | Array of objects: `[{status, value}, ...]` |
| **`Promise.race([p1, p2])`** | `Promise { <pending> }` | Winner's value: `val` |
| **`async function custom()`** | `Promise { <pending> }` | Whatever the function returns |

---

### 2. Common APIs (Node.js & Web)

| API / Library Method | WITHOUT `await` | WITH `await` |
| :--- | :--- | :--- |
| **`fs.promises.readFile('file.txt')`** | `Promise <Buffer/string>` | `Buffer` or `string` content |
| **`crypto.subtle.digest(...)`** | `Promise <ArrayBuffer>` | `ArrayBuffer` hash |
| **`navigator.clipboard.readText()`** | `Promise <string>` | Clipboard `string` content |
| **`db.user.findUnique(...)`** *(Prisma/ORM)* | `Promise <User \| null>` | `User` object or `null` |
| **`axios.get('/url')`** | `Promise <AxiosResponse>` | `{ data, status, headers }` |

---

### 3. Array Methods & Code Behavior

| Code Snippet | Output Type | Can call `.map()` / `.filter()`? |
| :--- | :--- | :--- |
| **`const data = Promise.allSettled(list)`** | `Promise` | **No** (Throws `TypeError: data.filter is not a function`) |
| **`const data = await Promise.allSettled(list)`** | `Array` | **Yes** |
| **`const data = fetch('/api')`** | `Promise` | **No** (Cannot access `.status` or `.json()`) |
| **`const data = await fetch('/api')`** | `Response` | **Yes** (Can access `.status`, call `.json()`, etc.) |

---

### 4. Mental Model
```
// ------------------------------------------------------------------
// WITHOUT AWAIT: You hold the sealed package
// ------------------------------------------------------------------
const promiseVal = fetch('/api'); 
console.log(promiseVal); 
// Output: Promise { <pending> }
// You CANNOT access contents directly!


// ------------------------------------------------------------------
// WITH AWAIT: You open the package and take out the item
// ------------------------------------------------------------------
const actualVal = await fetch('/api'); 
console.log(actualVal); 
// Output: Response { status: 200, ok: true, body: ReadableStream }
// You CAN interact with the actual data!
```
