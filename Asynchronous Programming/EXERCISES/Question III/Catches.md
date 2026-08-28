## QUESTION III - CATCHES & HINTS
---

> If unsure about how AbortController class works, visit [random-questions-3.md file](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/EXERCISES/random-questions-3.md)

1. If you want to capture a specific error (like the `AbortError`) in our case, compare it with `error.name` property.

> It is frequently mistaken to be compared to the actual `error` object.

2. Conceptually, the `timer` will start before the function does (synchronously), but this won't affect the countdown for the function's execution time at all.

> This is because JavaScript execute these lines nearly but not exactly at the same time, only a fraction of millisecond apart.

> However, this may be a flaw if between the two lines there is an expensive task going on/ being executed.

3. If there is a quite expensive task between two lines, or you want to automatically start the timer the time the request is being made exactly, use the newest `AbortSignal.timeout()` method.

> This method eliminates the use of `setTimeout()` completely, and we don't need to instantiate the `AbortController()` class.

4. This `AbortSignal.timeout()` produced a `TimeoutError` rather than the previous `AbortError`
5. Remember to `clearTimeout(id)` if you used `setTimeout()`, so as to prevent potential background leaks
6. If you use the newest `AbortSignal.timeout()`, clearing is not necessary.
7. To see the effect of the code in `solution.js` when the `AbortError` is met, try [throlling](https://www.debugbear.com/blog/chrome-devtools-network-throttling) your network down to 3G, and replace those "5000 ms" with "1000 ms" (1 second)

> In this way, as the network will be going at a very slow rate, the request will fail to resolve within 1 second, and an `AbortError` will be triggered.

> We briefly discussed about Network Throttling in section 2 of this [document](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/xhr-api.md)

8. BONUS: Example of how to use a simple modern `AbortSignal.timeout()`

```js
async function fetchUrl(url) {
    try {
        // Automatically aborts after 5 seconds
        const response = await fetch(url, { signal: AbortSignal.timeout(5000)});
        
        if (!response.ok) throw new Error("HTTP error");
        return response.json();
    
    } catch (error) {
        // AbortSignal.timeout produces a "TimeoutError".
        
        if (error.name === "TimeoutError") {
            throw new Error("Request Timed Out after 5 seconds");
        
        }else{throw error;}
        
    }
}
```