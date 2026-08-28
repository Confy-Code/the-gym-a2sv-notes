## QUESTION II - CATCHES & HINTS
---

**THE DIFFERENCE BETWEEN `Promise.any()` AND `Promise.race()`**
---

1. If we used `Promise.race()`, a single fast error or failed network request from the broken `this-may-not-exist.com` link would crash the entire function.

> Like, what if the promise handling `this-may-not-exist.com` is the fastest one? Our function would crash!

2. `Promise.any()` handles this, by waiting for the **quickest successful response.**

> If the fastest promise is the one with rejection, like `this-may-not-exist.com` promise in our case, unlike `Promise.race()` , `Promise.any()` will wait until it finds the nearest fast successful promise.

> Hence This will prevent our function to crash.
