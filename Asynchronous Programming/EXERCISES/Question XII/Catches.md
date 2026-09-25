## QUESTION XII - HINTS AND CATCHES
---

### BAD SOLUTION
---

> Even though `setInterval()` works for the question xii, it is not an optimal technique to use. Why ?

1. `setInterval()` can lead to race conditions, because no matter if the request was fast or slow to settle, the function fires the callback after the specified delay time anyway.

> Race conditions can lead into the updates that come in an unpredicted order.

2. This race condition is the one that stimulated us to use `AbortController()`, to abort any other requests still running in the background.

3. Use of IIFE: We used Immediately Invoked Functional Expressions to immediately call the function right after its definition. 

> We were avoiding having to call a function explicitly within a callback, which results into a complex formula.

4. **Avoidance of using Recursion**: We orginally wanted to pull `pollUntilDone()` into recursion, for calling `fetch()` recursively. But it failed. Why ?

> Calling `pollUntilDone()` again and again doesn't preserve the same `timerID`. It continously creates multiple IDS.

> By multiple IDs, everytime you use `clearInterval(timerID)`, you are only referring to some lone ID, not those multiple ones created.

> This automatically leads to a `Recursion Explosion (Maximum call stack size exceeded)`

5. From the notes above, we had to think about only one thing: How to avoid this generating of IDs again and again ? 

> Actually that's how IIFE came in

### Questions from the README

---

1. With `setInterval`, what happens if one status check takes longer than the 2-second interval? Do the checks start overlapping?

> Yes, checks overlap, leading to race condition. This can be mitigated by the **recursive `setTimeout()`**

2. Where exactly do you call `clearInterval` — and are you certain it runs on *both* the success path and the gave-up path?

> Whenever the `count` meets the maximum attempts, and whenever the response returns 'done'. So you can see that it tuns on both paths.

3. What should the caller receive when you run out of attempts? A rejection, or a resolved "didn't finish" value? Justify the choice.

> Should reject with an error. Because normally, the resolution represents an eventual outcome of a promise. So we will reject with an error.


### GOOD SOLUTION

---

> The optimal solution, and almost the simple one is to use a recursive `setTimeout()`.

1. We use a simple `await` technique so that the Request#2 awaits Request#1 for it to be fired.

> But, a reason to use `setTimeout()` ?

2. We used `setTimeout()` to place a delay between the arrival of response from Request#1, and the kick-off of the Request#2.

> If we just used recursion of `poll()`, yes requests would be fired sequentially, but without a delay.

> That's to say, the Request#1 finishes, and after 0ms Request#2 fires. This would storm our own API, which results to a DOD Attack, but an attack we initiated ourselves !!!





   