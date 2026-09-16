## JavaScript Asynchronous Programming —  Random Questions - 4

### 1. Race Condition

A **race condition** occurs when multiple async requests are running, but they resolve in an **unpredictable order**, causing an outdated result to overwrite a newer one.

Example: searching `"cats"`:

```text
"cat"  → Request 1 → 2000ms
"cats" → Request 2 → 100ms
```

Request 2 finishes first:

```text
cats → UI updates
```

Then Request 1 finishes:

```text
cat → UI updates AGAIN 
```

So the UI ends up showing results for `"cat"` even though the user typed `"cats"`.

### How do we prevent Race Condition?

A popular and easy way is using `AbortController` to cancel the previous request whenever a new request is made.

```javascript
let controller;

async function search(query) {
    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {
        const response = await fetch(`/search?q=${query}`, {
            signal: controller.signal
        });

        const data = await response.json();
        displayResults(data);

    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error);
        }
    }
}
```

The idea:

```text
New request starts
      ↓
Previous request is cancelled
      ↓
Only the latest request updates the UI
```

---

### 2. By using `await`, isn’t it some kind of synchronous programming?

**No.** `await` only makes the code *look synchronous*.

It pauses the **current async function**, not the entire JavaScript program.

```javascript
async function getData() {
    console.log("1. Starting");

    const response = await fetch("/slow-api");

    console.log("2. Data received");
}
```

While `getData()` is paused at `await`, other JavaScript work can continue.

### But What other operations?

For example, imagine two buttons:

```text
Fetch Data
Click Me
```

You click **Fetch Data**:

```text
0.0s → "1. Starting slow network request..."
     → await fetch(...)
```

The function pauses.

You can still click **Click Me**:

```text
0.5s → "Button clicked! Count: 1"
1.2s → "Button clicked! Count: 2"
```

Then when the request finishes:

```text
3.0s → "2. Data received!"
```

So the slow request doesn't freeze the UI.

### In the Background? (lifecycle of the `async` function)

A simplified lifecycle is:

```text
async function starts
       ↓
Call Stack
       ↓
hits await
       ↓
async function pauses / leaves the stack
       ↓
other work can run
       ↓
async operation settles
       ↓
continuation goes to Microtask Queue (because async functions returns Promise object)
       ↓
Call Stack becomes available
       ↓
function continues
```

For something like `fetch()`, the networking work is handled by the **browser's APIs**, rather than JavaScript sitting there doing nothing.

For something like:

```javascript
await Promise.resolve(10);
```

there is no slow network operation; the continuation is scheduled through Promise/microtask handling.

---

### 4. Can the Promise object be used inside the async function?

**Yes.** `async/await` does not replace Promises. It works **with** them.

```javascript
async function getData() {
    const re_1 = fetch("/users");
    const re_2 = fetch("/products");

    const [res1, res2] = await Promise.all([re_1, re_2]);

    const data1 = await res1.json();
    const data2 = await res2.json();

    console.log("All promises are resolved and data is received");
}
```

Both `fetch()` calls start before the `await`, so the requests can run **concurrently**.

```text
re_1 ────────────────┐
                     ├── Promise.all()
re_2 ────────────────┘
```

### But why `await` before the Promise object?

Because without `await`, the variable contains the **Promise itself**, not its eventual result.

```javascript
const result = Promise.all([re_1, re_2]);

console.log(result); // Promise
```

With:

```javascript
const result = await Promise.all([re_1, re_2]);

console.log(result); // actual results
```

So:

```text
Promise.all(...)
       ↓
returns a Promise
       ↓
await
       ↓
wait for it to settle
       ↓
get the actual result
```

Without `await`:

```javascript
const result = Promise.all([re_1, re_2]);

console.log("All promises are resolved!");
```

The message can execute **before the promises have finished**, because the code doesn't wait for `Promise.all()`.

### Key distinction

```javascript
const p1 = fetch("/users");
const p2 = fetch("/products");
```

→ start both requests.

```javascript
const results = await Promise.all([p1, p2]);
```

→ wait for both and get their results.

So **`await` doesn't make the requests sequential**. It only determines when the current async function continues.
