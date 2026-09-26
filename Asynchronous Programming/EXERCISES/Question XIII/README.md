## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION XIII

A user clicks "**`Load report`**," then immediately clicks "**`Cancel`**." Write the code that makes that cancel actually stop the network request — not just hide the result.

```jsx
// startRequest() should begin the fetch
// cancelRequest() should cancel it
```

Talk through it: what object do you need to create *before* the fetch starts, and what do you pass where?

**Things to look out for**

- When a request is aborted, does the `fetch` promise resolve or reject? Which `catch` block does that land in?
- How do you tell an abort apart from a real network failure in your error handling? (Look at the error's `name`.)
- Can you reuse the same `AbortController` for a second request after aborting the first? Try it and see.