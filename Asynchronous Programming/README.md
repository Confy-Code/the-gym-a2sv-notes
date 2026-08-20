# Asynchronous JavaScript — Quick Reference

> **Purpose:** Quick revision notes for understanding how JavaScript handles operations that finish later, especially **Promises, callbacks, Events, XHR, Web worker APIs, and Fetch**.

---

### Asynchronous JavaScript

* JavaScript is **single-threaded**, but asynchronous APIs allow work to be handled without blocking the main execution flow.
* You generally **cannot predict exactly when asynchronous requests will finish**. For example, multiple `GET` requests may return in a different order from the order in which they were started.
* A callback/function associated with asynchronous work usually executes **later**, after the current synchronous code has had a chance to run.
* Common asynchronous operations include:

  * Network requests
  * Timers
  * File operations
  * User events
  * API calls

---

# Quick Revision Rules

1. **Async operation** → result comes later.
2. **Request order ≠ completion order.**
3. **Promise states:** Pending → Fulfilled/Rejected.
4. **Settled** means Fulfilled **or** Rejected.
5. **A Promise settles only once.**
6. `.then()` → success/fulfillment.
7. `.catch()` → rejection/error.
8. `resolve(value)` → `value` goes to `.then()`.
9. `reject(error)` → `error` goes to `.catch()`.
10. No resolve/reject value → callback receives `undefined`.
11. **Promises** represent one eventual result.
12. **Events** can occur repeatedly.
13. Promises help avoid **callback hell / Pyramid of Doom**.
14. `fetch()` → Promise-based.
15. XHR → event-driven and useful for progress events.
16. `xhr.onerror` → network-level errors, not simply HTTP `404/500`.
17. Check `xhr.status` for HTTP response status.
18. `xhr.send()` → sends the XHR request.
19. `document.readyState`: `loading → interactive → complete`.
20. **Network throttling** → intentionally simulate slower network conditions.
21. Native JavaScript Promises are generally preferred over older Promise libraries.
22. **Polyfill** → provides missing functionality for older environments.
23. **Web Worker APIs**

| Concept              | Remember                                               |
| -------------------- | ------------------------------------------------------ |
| Web Worker           | Runs JavaScript in another thread                      |
| Main Thread          | Handles UI, DOM, rendering, etc.                       |
| Worker Thread        | Handles background/expensive computation               |
| `postMessage()`      | Sends data                                             |
| `onmessage`          | Handles received messages                              |
| `event.data`         | Contains received data                                 |
| Callback             | Function called later when something happens           |
| DOM                  | Workers cannot directly manipulate it                  |
| `worker.terminate()` | Stops a worker from the main thread                    |
| Dedicated Worker     | Worker belonging to one page/script                    |
| Shared Worker        | Can be shared by multiple browsing contexts            |
| Service Worker       | Used for capabilities such as caching/offline behavior |
| Node.js              | Uses `worker_threads` and `parentPort`                 |


24. `.then()` → **continue when Promise finishes**
25. `return Promise` inside `.then()` → **chain another Promise**
26. `Promise.all()` → **wait for everything**
27. `Promise.race()` → **first settled Promise wins**
28. `async` → **function returns a Promise**
29. await` → **wait for a Promise inside an async function**
30. try...catch` → **handle rejected Promises**
31. Independent tasks → **start them together instead of unnecessarily awaiting one before starting another**
