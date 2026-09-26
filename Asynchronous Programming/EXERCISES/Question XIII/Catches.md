## Question XIII - Catches

> Just added an HTML file for the sake of testing only. It is not necessarily part of the solution. It also contains some simple in-line CSS for a better view.

---

1. When passing a callback to the Event listener, avoid using a function with its `()` brackets. Why?

> This immediately calls that function before an event is even fired, but whenever the line is reached.

> But without `()`, it actually waits for the event to be fired.

---

2. Why `controller = null;` line?

> We defined the controller at a higher scope, so that the `cancelRequest()` can access it. 

> We initially had a temptation to call `cancelRequest()` inside the `startRequest()`, but it was called after `fetch()` obviously. This was making it `await` for the fetch to finish by the way, however we wanted to cancel the request in flight

> That is how the idea of moving `controller` at higher scope came up

---

**Things to look for**

---

1. When a request is aborted, does the `fetch` promise resolve or reject? Which `catch` block does that land in?

> The promise rejects with an `AbortError`. This error is handled by the `catch` block.

2. How do you tell an abort apart from a real network failure in your error handling? (Look at the error's `name`.)

> I always communicate the abort when the check `error.name == "AbortError"` is true, otherwise I display a different error.

3. Can you reuse the same `AbortController` for a second request after aborting the first? Try it and see.

> No. Once `controller.abort()` is called, its signal remains permanently in an aborted state `(signal.aborted === true)`. If a new `fetch()` is based on that aborted signal, network will refuse to respond. 

> You must instantiate a new AbortController() for every new request.

> Examine this by replacing `controller = null` by `controller = AbortController()` at higher scope. And then erase the instantiation in `startRequest()`. 

> When you click `Cancel`, and then `Load Report` again, you will keep seeing `Request has been aborted`. Not `Request has started` anymore.

---
