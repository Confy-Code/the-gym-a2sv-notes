## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - RANDOM QUESTIONS 5
---

1. What is a callback ?

A callback is a function that is passed to another outer function as an argument, and it is invoked inside that function too.

```js
function test(callback){
    callback(20)
}

test(value => console.log(value)) // 20
```

---

2. What is the purpose of Promises?

The main purpose of Promise is eliminate the need of calling nested callbacks over and over again. (Callback hell)

Consider three asynchronous tasks:
```js
function test(callback) {
    setTimeout(() => {
        const error = null;
        const data = "I simulate resolution, and this function resolves";

        if(error){
            callback(null, error)}
        else{
            callback(data, null)
        }
    }, 2000)
}

function test2(callback) {
    setTimeout(() => {
        const error = null;
        const data = "CallBack hell 2";

        if(error){
            callback(null, error)}
        else{
            callback(data, null)
        }
    }, 2000)
}

function test3(callback) {
    setTimeout(() => {
        const error = null;
        const data = "CallBack hell 3";

        if(error){
            callback(null, error)}
        else{
            callback(data, null)
        }
    }, 2000)
}
```

**Callback Hell (Pyramid of Doom)** would be:
```js
test((err, data) => {
    if (err) return console.error(err);
    console.log(data);

    test2((err, data2) => {
        if (err) return console.error(err);
        console.log(`The data: '${data2}' has been jsonified`);

        test3((err, data3) => {
            if (err) return console.error(err);
            const dataFormatted = `${data3}.formatted`;
            console.log(`Formatted data: ${dataFormatted}`);
        });
    });
});

```

**Promises** solved this by **Promise chaining**:
```js
test()
    .then((data) => {
        console.log(data);
        return test2();
    })
    .then((data2) => {
        console.log(`The data: '${data2}' has been jsonified`);
        return test3();
    })
    .then((data3) => {
        const dataFormatted = `${data3}.formatted`;
        console.log(`Formatted data: ${dataFormatted}`);
    })
    .catch((err) => {
        console.error("An error occurred anywhere in the chain:", err);
    });
```

But the modern way to do it, is using `async/await`:

```js
async function runTasks() {
    try {
        const data1 = await test();
        console.log(data1);

        const data2 = await test2();
        console.log(`The data: '${data2}' has been jsonified`);

        const data3 = await test3();
        const dataFormatted = `${data3}.formatted`;
        console.log(`Formatted data: ${dataFormatted}`);
    } catch (err) {
        console.error("An error occurred during execution:", err);
    }
}

runTasks();
```

---

3. What happens to `Promise.any()` when all promises that were passed into it rejects ? 

> It rejects with an `AggregateError` error.

---

4. What is the return type of the `.then()` function?
   
> It returns a new promise always. The same goes to `.catch()`

```js
const promise1 = Promise.resolve("I am a promise")
let test = promise1.then()
let rej = promise1.catch()

const timer = setTimeout(() => console.log("I return an ID"), 1000)

console.log(test instanceof Promise) // true
console.log(rej instanceof Promise)  // true
console.log(timer instanceof Promise) // false 
```

---

5. What is XMLHttpRequest, what are its 5 states, and why is fetch() generally preferred in modern JavaScript?

> XMLHTTpRequest is an old browser API that handled the HTTP Requests off and on server. 

>It was replaced by the modern `fetch()`, as the new API came with a simpler syntax/structure, and fought against the callback hell that was caused by the XHR

**5 States of XHR**
---

| State Value | Name | Constant | Description |
| :---: | :--- | :--- | :--- |
| **0** | `UNSENT` | `XMLHttpRequest.UNSPECIFIED` / `UNSENT` | Client created; `.open()` has not been called yet. |
| **1** | `OPENED` | `XMLHttpRequest.OPENED` | `.open()` has been called; HTTP method and URL are configured. |
| **2** | `HEADERS_RECEIVED` | `XMLHttpRequest.HEADERS_RECEIVED` | `.send()` has been called; headers and status code are available. |
| **3** | `LOADING` | `XMLHttpRequest.LOADING` | Downloading response body; `xhr.responseText` contains partial data. |
| **4** | `DONE` | `XMLHttpRequest.DONE` | Operation complete; all data is downloaded or the request failed. |

A simple code-snippet to show the full cycle (uses an event listener `onreadystatechange`)

```js
const xhr = new XMLHttpRequest()
const url = 'https://jsonplaceholder.typicode.com/users'

console.log(xhr.readyState)

// Event listener to listen for any change in the state

xhr.onreadystatechange = () => {              
    console.log(`Current state: ${xhr.readyState}`)

    if (xhr.readyState == xhr.LOADING){
        console.log("The data is being downloaded")
    }
}

xhr.open("GET", url)

console.log(xhr.status)

xhr.send()
```

OUTPUT:

```text
0
Current state: 1
VM1495:16 0
undefined
Current state: 2
Current state: 3
The data is being downloaded
Current state: 4
```

---