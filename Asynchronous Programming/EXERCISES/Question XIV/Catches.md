## QUESTION XIV - CATCHES

**Things to look out for**

---

1. What value does your `sleep` resolve *with*? Does it matter that it resolves with nothing?
   
> No, it doesn't matter as long as we are not outputting the resolved value.


2. If you call `sleep(1000)` without `await`ing it, what happens? Why does the `console.log` run immediately?

> It runs immediately beacuse it doesn't wait for the promise to settle. Yes the program terminates after the timeout has run out, but without `await`, `console.log` below it won't necessarily wait for the `sleep()`

3. Is the delay guaranteed to be exactly 1000ms, or is 1000 a minimum? What would make it longer?

> It is 1000 a minimum. Why:

- **Main Thread Blocking**: A long-running synchronous task on the call stack holds the thread, forcing the timer callback to wait until the stack is empty.
  
- **Microtask Queue Bottleneck**: Promises and queueMicrotask take priority over setTimeout. If microtasks continuously execute, the timer callback gets delayed.

---