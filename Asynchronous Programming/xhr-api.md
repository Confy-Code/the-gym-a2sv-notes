## ASYNCHRONOUS PROGRAMMING - XHR API & OTHER ANALOG PROMISES (J & Q QUERY PROMISES)
> **Note:** These are quick-reference notes on browser APIs and asynchronous JavaScript, covering `document.readyState`, network throttling, XHR, error handling, and Promise-related tools. They are intended for revision and quick reference rather than as a complete lecture.
---

### `document.readyState`

`document.readyState` tells you the current loading state of the document.

| State         | Meaning                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------- |
| `loading`     | The document is still loading                                                             |
| `interactive` | The HTML document has been parsed and the DOM is ready; subresources may still be loading |
| `complete`    | The document and its dependent resources have finished loading                            |

Typical progression:

```text
loading
   ↓
interactive
   ↓
complete
```

---

### Network Throttling

**Network throttling** intentionally makes the network connection slower.

It is useful during development and testing because it allows you to simulate:

* Slow internet
* Mobile connections
* Delayed API responses
* Long downloads
* Poor network conditions

This is particularly useful when testing whether asynchronous code behaves correctly when responses take longer than expected.

---

## XHR vs Fetch API

### XMLHttpRequest (XHR)

XHR is the older browser API for making HTTP requests.
> By browser API, this means that you have to run it inside the browser.
> Otherwise, you will be required to install dedicated Node libraries.
> As some pages may block the network connections due to their CSP, consider running it on blank page in Chrome.
> Navigate to the blank page by `about:blank` in Chrome.

```javascript
const xhr = new XMLHttpRequest();

xhr.open("GET", "/api/data");

xhr.onload = () => {
    // response received
};

xhr.onerror = () => {
    // network error
};

xhr.send();
```

### Fetch API

> Fetch API will be later discussed in deep in other section of this same folder.

`fetch()` is the modern native API and is **Promise-based**.

```javascript
fetch("/api/data")
    .then(response => response.json())
    .then(data => {
        // use data
    })
    .catch(error => {
        // handle error
    });
```

### Main Difference

| XHR                            | Fetch                       |
| ------------------------------ | --------------------------- |
| Event-driven                   | Promise-based               |
| Older API                      | Modern API                  |
| More verbose                   | Cleaner syntax              |
| Built-in progress events       | Simpler response handling   |
| Commonly uses callbacks/events | Uses `.then()` / `.catch()` |

> With fetch(), we usually parse the `response` by calling `response.json()`.
> With XHR, we often parse the response text (now embedded in `xhr` object) with `JSON.parse(xhr.responseText)`.

**Important advantage of XHR:**

XHR provides convenient **progress events**, which can be useful for tracking upload/download progress.

**General rule:**

> Prefer `fetch()` for modern request/response code; XHR can still be useful when detailed progress-event handling is important.

---

## 9. XHR Error Handling

A common mistake is assuming:

```javascript
xhr.onerror
```

handles every HTTP error.

It does **not** mean "the server returned 404/500."

`xhr.onerror` primarily deals with **network-level failures**, such as a request that cannot successfully be completed at the network level.

HTTP status errors such as:

```text
404 Not Found
500 Internal Server Error
```

are normally inspected using:

```javascript
xhr.status
```

inside the successful XHR completion flow.

```javascript
xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        // HTTP success
    } else {
        // HTTP error such as 404 or 500
    }
};
```

> **Remember:** Network error ≠ HTTP status error.

---

## 10. `xhr.send()`

`xhr.send()` actually sends the request to the server.

```javascript
xhr.open("GET", url);
xhr.send();
```

For requests carrying data, such as POST:

```javascript
xhr.open("POST", url);
xhr.send(data);
```

The way data is sent depends on the HTTP method and request configuration.

---

## 11. Native Promises vs Third-Party Promise Libraries

Modern JavaScript provides **native Promises**, so external Promise libraries are often unnecessary for basic Promise functionality.

Older libraries such as:

* jQuery Deferred / Promises
* Q
* Bluebird

were historically useful for asynchronous programming before native Promise support became widespread.

### jQuery

Older code commonly used:

```javascript
$.ajax(...)
```

with methods such as:

```javascript
.fail(...)
```

Modern JavaScript commonly uses:

```javascript
fetch(...)
    .then(...)
    .catch(...)
```

### Q

Q was an early Promise library. With native JavaScript Promises now available, the need for such libraries is much smaller.

> **General takeaway:** Learn and prefer **native JavaScript Promises** unless a project specifically requires another Promise implementation.

---

## 12. Promise Polyfills

Older environments that did not support native Promises could use **polyfills** to provide Promise functionality.

Examples include:

* `es6-promise`
* `core-js`

A polyfill essentially provides functionality that an older environment does not natively support.

```text
Modern browser
     ↓
Native Promise available
     ↓
No Promise polyfill needed

Older environment
     ↓
Native Promise unavailable
     ↓
Polyfill can provide compatibility
```

---
