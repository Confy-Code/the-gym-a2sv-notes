## QUESTION VIII - HINTS AND CATCHES

**SECTION A: ANSWERS TO THE 'WHAT TO LOOK FOR' QUESTIONS**
---

1. What happens to the whole batch if one request fails — does everything stop, or do the others keep going? Is that the right default?

> We use `Promise.allSettled()` instead of `Promise.all()`. `allSettled()` waits for every promise, whether it fulfills or rejects.

> The `finally` block also always executes, so a waiting task can be released even when a request fails.

---

2. How would you guarantee the results array lines up with the original urls order, given requests can resolve in any order?

> `map()` creates the promises in the same order as the original urls.

> `Promise.allSettled()` preserves that input order, even though the requests may finish in a different order.

---

3. At what concurrency limit does raising it stop helping? What's the actual bottleneck — the browser, the server, or the network?
   
> *Browser bottleneck*: If the JS code is running in the browser, browser imposes its own limits, often to 6 requests on older HTTP environments, and a 100 to newer ones.

> *Server bottleneck*: If the code is running say on Node JS Server, which has no limitations rule, firewalls impose the limitations. Firewall may flag too many requests as DDoS attack. Optimal limit is between 10 an 25.

> *Network bottleneck*: Based on network cap (megabytes of the requests), this can limit the requests

---

**SECTION B: CRUCIAL NOTES**
---

1. `in flight`: Requests that have **already started but have not yet settled**

2. **Counter Approach**
---
We'd have used a simple *counter approach* to solve this problem, but as we will see it later it has some flaws.

```js
let count = 0;

async function fetchUrl(){
	counter ++
	
	if (counter <= limit){
		try{
			const response = await fetch(url)
			
			if (!response.ok) throw new Error();
			
			return await response.json()
	}
	
	catch(error){console.log(error)}
	finally{counter --}
  }
}

else {
 console.log(The request has been dropped due to limit)
 return null
} 
	

async function fetchAllWithLimit(urls, limit){
	const promises = urls.map(url => fetchUrl(url)) // Array of promises
	const result = await Promise.all(promises); //await all promises to settle
	
	return result
}
```
> But this has one problem. `map` starts all the requests sequentially, and if the limit is hit, the request triggers the log 'the request has been dropped' ... , and the function will be just over. Yet we want the function to comeback once the slot is free (under the limit). This will be achieved by using **Deferred Resolution**

---

# Deferred Resolution vs Instant Resolution

Sometimes we want a Promise to resolve immediately (Instant Resolution):

```javascript
async function instantR() {
    return new Promise(resolve => {
        resolve("Done");
    });
}
```

> This is the **Instant Resolution**. But this problem will require us to use **Deferred solution**.

But in this question, we want to **pause a function and resolve it later manually**.

Basic template for Deferred Resolution:

```javascript
let waitlist = [];

async function deferred() {
    const lock = new Promise(resolve => {
        waitlist.push(resolve);  // steal the key - store it somewhere else in the global variable
    });

    await lock;  // function will pause here

    console.log("I can continue now");  // consoles after the pause has been actually escaped
}
```

Calling:

```javascript
deferred();
```

pauses at:

```javascript
await lock;
```

Later:

```javascript
const unlock = waitlist.shift();

unlock();
```

`unlock()` is the stored `resolve()` function, so the waiting function continues.

---

**Important:** `map()` calls `fetchUrl()` for every URL, but the queue prevents more than `limit` requests from being **in flight** at once.

---

### Before `async/await`: Generators

Before `async/await` developers used async generators. The generators freeze and unfreezes programs like this:

```javascript
function* test() {
    console.log("Old way generators");

    yield "This is pause 1";

    console.log("Pause 1 ended");

    yield "This is pause 2";

    console.log("Pause 2 ended");

    return null;
}

const controller = test();

let unlock = controller.next();
console.log(unlock.value);

let unlock_2 = controller.next();
console.log(unlock_2.value);

let unlock_3 = controller.next();
console.log(unlock_3.value);
```

Output:

```text
Old way generators
This is pause 1
Pause 1 ended
This is pause 2
Pause 2 ended
```

Each:

```javascript
controller.next();
```

resumes the **same generator** from where it previously stopped.

**Note**: You may mistakenly assue that the next() works like the popular next in Pythonic Linked Lists. No. Always link the next() to the original controller (head), instead of the recent instance (like how it is done for linked lists)
---

# KEY DIFFERENCE BETWEEN GENERATORS AND THE QUEUE MECHANISM

```text
Queue mechanism
→ system controls when tasks continue
→ useful for concurrency limits / resource management

Generators
→ caller controls when execution continues
→ useful when you want manual pause/resume behavior
```
