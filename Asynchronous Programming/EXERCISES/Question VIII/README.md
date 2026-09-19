## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION VIII

Design a `fetchAllWithLimit(urls, limit)` function that fetches every URL in the array, but never has more than `limit` requests in flight at the same time. Talk through your design before writing code — how do you track what's 'in flight'? Do you start all requests and throttle somehow, or pull the next one only when a slot frees up?

**Things to look out for**

- What happens to the whole batch if one request fails — does everything stop, or do the others keep going? Is that the right default?
- How would you guarantee the results array lines up with the original `urls` order, given requests can resolve in any order?
- At what concurrency limit does raising it stop helping? What's the actual bottleneck — the browser, the server, or the network?