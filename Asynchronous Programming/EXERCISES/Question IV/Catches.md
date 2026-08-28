## QUESTION IV - CATCHES & HINTS

> If you are unsure of the XMLHTTPRequest, visit [xhr-api.md file](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/xhr-api.md)

> Remember that `XHR` is a browser API. So make sure you run your code inside the browser's console.
---

1. `xhr.open()` requires at least two arguments: the `method` and the `url`.
2. The request has the response's data if the request's status ranges from **200 to 300** inclusively.
3. To retrive the data for `xhr`, we use `.responseText`. Note that we do not use `.json()` as we do for the `fetch()` API

> `.responseText` is not a function, unlike `.json()`. So don't ever think of putting brackets after it.

4. `xhr.onerror` is only concerned with Network errors. Other errors are passed into the `reject()`

> Try running the `solution.js` script while offline, the `xhr.onerror` will be triggered.

5. If `xhr.send()` is somehow forgotten, the promise will be stuck on `pending` state; i.e, It will never be settled.

6. To acquire a successful fetch, remove those '<>' around the passed url.
 