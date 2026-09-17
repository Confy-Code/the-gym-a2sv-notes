## Question IX - Hints & Catches

**SECTION A: WHAT TO LOOK FOR**
---

1. If the timeout wins, is the original network request actually cancelled, or just ignored by your code while it keeps running?

> It is cancelled, using the instance of the `AbortController()` class. Even when the request wins, the same signal is applied to the timer, through attaching the event listener for the `abort` event.

2. How would the calling code tell the difference between 'timed out' and 'server returned an error'?
   
> The `setTimeout()`'s promise will resolve with the message 'Timed out'; While the `fetch()` one will reject with the message 'Server returned an error'


3. What's the real-world tradeoff between a short timeout (snappy failure, more false positives on slow networks) and a long one?

> For a short timeout, nearly all requests will timeout before even having a chance to load. While for the long one, the failing requests can really take a long time 'failing', yet there was a chance to communicate earlier as soon as the 'failing' becomes kinda boring.

---

**SECTION B: NOTES**
---

1. `AbortController()`'s signal doesn't only work for `fetch()`. It can also be used with `setTimeout()`
2. The signal listens for the `abort` event, and when it is fired anywhere in the code by `controller.abort()`, it executes its callback, in this case `clearTimeout(id)` to terminate the timer.
3. Object destructuring revision
   ```js
   const {signal} = controller  // modern (destructuring)
   const signal = controller.signal //traditional

   const name = user.name
   const age = user.age // traditional

   const {name, age} = user //modern
   ```

4. When using `Promise.race()`, after the first promise wins the race, slow promises will keep running in the background too.

> Play with the code, removing the `controller.abort()` so on and so forth, and see the time it takes the whole program to end. Observe the time using this [platform](https://onecompiler.com/javascript)

5. That is why whenever the `fastPromise` is got, we automatically `controller.abort()` any remaining requests, whether resolved (in try block) or failed (in catch block)

6. The solution was for the sake of putting two things in a 'race' as the question suggested. But if it wasn't the case, we'd have used `AbortSignal.timeout(milliseconds)` inside the `fetch()`, and the whole thing would have been done instantly.