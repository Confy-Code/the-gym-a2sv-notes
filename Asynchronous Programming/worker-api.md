# WEB WORKER API

## 1. Core Idea

* **Web Workers** allow JavaScript to run in a **separate thread** from the main/UI thread.
* They are mainly used for **expensive or CPU-intensive tasks** so the main page remains responsive.
* A worker normally runs a **separate JavaScript file**.

```text
Main Thread
    │
    │ postMessage(data)
    ▼
Worker Thread
    │
    │ postMessage(result)
    ▼
Main Thread
```

## 2. Main Thread vs Worker

* **Main/UI Thread:** Handles the DOM, user interaction, rendering, and normal JavaScript execution.
* **Worker Thread:** Performs background computations.
* Workers **cannot directly access or modify the DOM**.
* Communication happens through **message passing**.

## 3. Basic Web Worker Setup

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Web Worker Example</title>
</head>
<body>

    <button id="btn">Start Calculation</button>

    <script src="main.js"></script>
</body>
</html>
```

### Main Thread — `main.js`

```js
const worker = new Worker("./worker.js");

document.getElementById("btn").addEventListener("click", () => {
    worker.postMessage(100000000000);
});

worker.onmessage = (event) => {
    console.log("Worker returned:", event.data);
};
```

### Worker — `worker.js`

```js
self.onmessage = (event) => {
    const number = event.data;
    let result = 1;

    for(let num = 1; num <= number; num++){
      result *= num    // expensive calculation (task)
    }

    self.postMessage(result);
};
```

### Flow

```text
main.js
   │
   │ worker.postMessage(10)
   ▼
worker.js
   │
   │ event.data → 10
   │
   │ self.postMessage(100)
   ▼
main.js
   │
   │ event.data → 100
```

## 4. `postMessage()`

`postMessage()` is a **method/function** used to send data to another thread.

```js
worker.postMessage(10);
```

The worker receives it through `onmessage`:

```js
self.onmessage = (event) => {
    console.log(event.data); // 10
};
```

A worker can also send data back:

```js
self.postMessage(100);
```

The main thread receives it:

```js
worker.onmessage = (event) => {
    console.log(event.data); // 100
};
```

### Important Distinction

* `postMessage()` → **method** → sends a message.
* `onmessage` → **event-handler property** → specifies what to do when a message arrives.
* `event.data` → contains the actual data received (the argument passes into the callback of the `onmessage` property).

```js
worker.postMessage(10);       // SEND

worker.onmessage = (event) => {  // RECEIVE
    console.log(event.data);     // RECEIVED DATA
};
```

## 5. Why `onmessage` Does Not Have Arguments

Simply, because the `onmessage` is generally treated as the property of the `worker` object.

Consider it as:
```js
worker = {
  onmessage: null,
  postmesssage: function(){};
};
```
> You can see that, postmessage has arguments because it is considered as the method contained in the `worker` object originally.

## 6. Callback

A **callback** is a function that is given to another mechanism so that it can be called **later when something happens**.

```js
worker.onmessage = (event) => {
    console.log("Message received!");
};
```

The arrow function is effectively a callback:

```text
"When a message arrives,
call this function."
```

Another simple example:

```js
setTimeout(() => {
    console.log("This runs later");
}, 1000);
```

The function passed to `setTimeout()` is a callback.

## 7. Passing Different Types of Data

Workers can exchange more than just numbers (arrays, objects, strings, ...).

Main.js:

```js
worker.postMessage({
    name: "Confy",
    age: 21
});
```

Worker.js:

```js
self.onmessage = (event) => {
    console.log(event.data.name);
    console.log(event.data.age);
};
```

## 8. Updating the DOM

Workers **cannot directly manipulate the DOM**.

This will not work:

```js
// worker.js

document.getElementById("result").textContent = "Done!";
```

Instead, the worker sends the result back:

```js
// worker.js

self.postMessage("Done!");
```

Then the main thread updates the DOM:

```js
// main.js

worker.onmessage = (event) => {
    document.getElementById("result").textContent = event.data;
};
```

```text
Worker
  │
  │ sends result
  ▼
Main Thread
  │
  │ updates DOM
  ▼
Web Page
```

## 9. Terminating a Worker

A worker can be stopped from the main thread:

```js
worker.terminate();
```

The worker itself can also stop itself:

```js
self.close();
```

> Use this when the worker is no longer needed.

## 10. Dedicated vs Shared Workers

### Dedicated Worker

A **Dedicated Worker** belongs to the page/script that created it.

```js
const worker = new Worker("./worker.js");
```

This is the most common type when learning or implementing background computation.

### Shared Worker

A **Shared Worker** can communicate with multiple browsing contexts.
> Shared workers use a communication `port` rather than the simpler dedicated-worker interface.

## 11. Service Workers

A **Service Worker** is another type of worker used mainly for web-app capabilities such as:

* Caching
* Offline functionality
* Intercepting network requests

> A Service Worker is different from a normal Dedicated Worker and has its own lifecycle and APIs.

---
> Service worker API and Shared worker API will be later discussed about deeply in other sections in this same folder.

---

## 12. Node.js Worker Threads

Browser Web Workers and Node.js workers use different APIs.

### Browser

```js
const worker = new Worker("./worker.js");

worker.postMessage(data);

worker.onmessage = (event) => {
    console.log(event.data);
};
```

### Node.js

Node.js provides workers through the native `worker_threads` module.

```js
const { Worker, parentPort } = require("worker_threads");
```

Communication commonly uses:

```js
parentPort.postMessage(result);
```

and:

```js
parentPort.on("message", (data) => {
    // process data
});
```

So remember:

```text
Browser Web Worker
    postMessage()
    onmessage
    event.data

Node.js Worker Thread
    parentPort.postMessage()
    parentPort.on("message")
```

## 13. Core Pattern to Memorize

```js
// main.js

const worker = new Worker("./worker.js");

worker.postMessage(data);

worker.onmessage = (event) => {
    console.log(event.data);
};
```

```js
// worker.js

self.onmessage = (event) => {
    const data = event.data;

    const result = /* expensive work */;

    self.postMessage(result);
};
```

**Mental model:** `postMessage()` sends → `onmessage` receives → `event.data` gives you the data → worker sends the result back → main thread can update the DOM.
