# Asynchronous JavaScript — Quick Reference

> **Purpose:** Quick revision notes for understanding how JavaScript handles operations that finish later, especially **Promises, callbacks, Events, XHR, and Fetch**.

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
