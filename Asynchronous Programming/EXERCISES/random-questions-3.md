## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - RANDOM QUESTIONS 3
---

**1. How can callbacks lead to race conditions and how do you prevent them?**
---

A **race condition** can occur when multiple asynchronous operations are running concurrently and the final result depends on **which one finishes first (wins the race)**.

Classic example:

```text
User types:

c
ca
cat
```

Suppose each keystroke sends a request:

```text
"c"   → Request A (500 ms)
"ca"  → Request B (300 ms)
"cat" → Request C (100 ms)
```

You expect:

```text
C → A → T
```

But network timing might produce:

```text
C → C
A → CA
B → CAT
```

For example:

```text
Request C ("cat") finishes first
Request B ("ca") finishes second
Request A ("c") finishes last
```

If every response updates the UI, the **oldest response might overwrite the newest result**.

That's a race condition.

---

#### Strategy 1: AbortController

Cancel the previous request when a new request starts.

```js
let controller;

async function search(query) {

    if (controller) {
        controller.abort(); // results in AbortError
    }

    controller = new AbortController(); //new instance

    try {
        const response = await fetch(
            `/search?q=${query}`,
            {
                signal: controller.signal
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {
        if (error.name === "AbortError") {
            console.log("Previous request cancelled");
        } else {
            console.error(error);
        }
    }
}
```

Flow:

```text
Request "c"
    ↓
Request "ca" starts
    ↓
abort "c"
    ↓
Request "cat" starts
    ↓
abort "ca"
    ↓
"cat" continues
```

> **Note**: AbortController can control multiple requests

The same signal can be attached to multiple operations:

```js
const controller = new AbortController();

fetch(url1, { signal: controller.signal });
fetch(url2, { signal: controller.signal });
fetch(url3, { signal: controller.signal });

controller.abort();
```

All requests using that signal can be aborted.

---

> Other techniques beside of the AbortController() are there to help too, but they are kinda complex.

---

**2. What are some strategies for handling large numbers of concurrent Promises to avoid overloading the event loop?**
---

Consider:

```js
const promises = urls.map(url => fetch(url));

await Promise.all(promises);
```

If there are:

```text
10,000 requests   → potentially problematic
```

Starting thousands of operations simultaneously can:

* overload your server
* trigger rate limits
* consume memory
* create excessive network activity
* cause `429 Too Many Requests`
* increase resource usage

`Promise.all()` as it starts everything at once, if they are huge, this can cause complications.

---
**Techniques:**
- Concurrency pool: allows some maximum number of promises to run (bouncer)
- Basic idea: we `promise.race()` to free up the spot for the currently executing promises
- we `promise.all(results)` so as to wait for the final batch of the promises to resolve or reject

- on Production level, we use libraries like `p-limiter` to highlight this whole scenario is simple terms

> This section of handling concurrency will be later broaden up.