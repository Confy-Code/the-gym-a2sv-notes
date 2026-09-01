## QUESTION VI - CATCHES & HINTS
---

1. `resolve()` is so essential in the `setTimeout()`'s callback.
2. This `resolve()` tells the second function to `await` until `resolve()` is hit.

> It is like saying, this `promise` inside the `delay` function is over, please proceed.

3. If in place of `resolve()` you decide to leave it blank, the `await delay()` will keep awaiting... as it doesn't know where to terminate the process.