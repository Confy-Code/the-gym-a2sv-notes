## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION VIII

`fetch()` has no built-in timeout — a hung server leaves your request pending forever. Design a `fetchWithTimeout(url, timeoutMs)` function that rejects if the server hasn't responded in time. Talk through it first: what tool lets you 'race' two things against each other, and what's the second thing you're racing the fetch against?

**Things to look out for**
---

- If the timeout wins, is the original network request actually cancelled, or just ignored by your code while it keeps running?
- How would the calling code tell the difference between 'timed out' and 'server returned an error'?
- What's the real-world tradeoff between a short timeout (snappy failure, more false positives on slow networks) and a long one?
