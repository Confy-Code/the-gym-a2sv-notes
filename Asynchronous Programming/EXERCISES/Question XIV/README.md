## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION XIV

Write a `sleep(ms)` function that lets you await a period of time or **`sleep`** and lets you do something like this:

```jsx
async function demo() {  
	console.log('starting');
	await sleep(1000);
	console.log('one second later');
}
```

Talk through it before writing code — `setTimeout` takes a callback, but `await` needs a promise. How do you get from one to the other?

**Things to look out for**

- What value does your `sleep` resolve *with*? Does it matter that it resolves with nothing?
- If you call `sleep(1000)` without `await`ing it, what happens? Why does the `console.log` run immediately?
- Is the delay guaranteed to be exactly 1000ms, or is 1000 a minimum? What would make it longer?