## ASYNCHRONOUS PROGRAMMING - PARALLEL VS SERIAL REQUESTS

### 1. PARALLEL REQUESTS

Parallel requests are multiple asynchronous requests that are **started without waiting for the previous request to finish**.

Example:

```js
const p1 = getJSON("/data/1.json");
const p2 = getJSON("/data/2.json");
const p3 = getJSON("/data/3.json");

const results = await Promise.all([p1, p2, p3]);
```
---

> **NOTE**: Parallel requests can appear in `random order` depending on which finishes first.

Consider:

```js
getJSON("../data/earth-like-results.json")
    .then((response) => {

        response.results.forEach((url) => {
            getJSON(url)
                .then(createPlanetThumb);
        });

    });
```

**QUESTION**
```
What's the problem with this code?

* Requests in series but return in parallel, causing a collision.
* Thumbnails will be created in a random order
* Requests are blocking so this will never finish?
* Nothing!

```
**ANSWER**

```
Thumbnails will be created in a random order
```

** Why the answer? **
---

- The requests are correctly started in order (series) as they are in loop, and return in parallel
> But there can't be collision; JS Engine is better than that. Requests are never blocking too for the same reason

- `forEach()` starts all the asynchronous requests without waiting for the **previous request to finish**.
- So, we cannot know in which order the Thumbnails will be created.

> See How we can mitigate this in section 3 of this document.
---

### 2. SERIAL REQUESTS

Serial requests are requests where the **next request waits for the previous request to complete**.

Example:

```js
const result1 = await getJSON("/1.json");
const result2 = await getJSON("/2.json");
const result3 = await getJSON("/3.json");
```

> This gives you predictable sequencing, unlike the one in previous section with `forEach()`

---

### PARALLEL VS SERIAL


|                  | Parallel                  | Serial                     |
| ---------------- | ------------------------- | -------------------------- |
| Requests         | Start without waiting     | Start one after another    |
| Execution        | Overlapping               | Sequential                 |
| Completion order | Can vary                  | Predictable                |
| Speed            | Usually faster            | Usually slower             |
| Dependency       | Usually independent       | Often dependent            |
| Main concern     | Ordering / resource usage | Total execution time       |
| Typical tool     | `Promise.all()`           | Promise chaining / `await` |


---

### 3. HOW CAN WE MAKE THE REQUESTS SERIAL?

See how we refactored the code in section 1, to make it execute in order (serial):

```js
getJSON('../data/earth-like-results.json')
.then(function(response) {
  let sequence = Promise.resolve();

  response.results.forEach((url) => {
    sequence = sequence.then(() => getJSON(url));
    })
    .then(createPlanetThumb);
  })
.catch(function(e) {
  console.log(e);
});
```

- We re-assigned `sequence` to implement serial requests
- If we don't reassign, `sequence` keeps pointing to the original resolved Promise
> Remember we defined `sequence = Promise.resolve()`?

- To avoid this, we make `sequence` point to previous Promise, instead of pointing to the original resolved Promise
- So the next iteration does not start fresh. It uses the updated `sequence`, which already includes the earlier request
- `.then()` will then execute the first promise in order, as it can't execute the second ahead of the first one.


---
We can also use `async/await`:

```js
const response = await getJSON(
    "../data/earth-like-results.json"
);

for (const url of response.results) {
    const result = await getJSON(url);

    createPlanetThumb(result);
}
```

> Remember to put `async` when creating the function


---

### 4. WHEN SHOULD WE USE PARALLEL REQUESTS?

Use parallel requests when the requests are **independent**.

For example:

```js
const [profile, notifications, recommendations, settings] =
    await Promise.all([
        getJSON("/profile"),
        getJSON("/notifications"),
        getJSON("/recommendations"),
        getJSON("/settings")
    ]);
```

They can all start together.

---

> Parallel requests' execution can be implemented by `map()`, `forEach()`, `.all()`, ...

### 5. WHEN SHOULD WE USE SERIAL REQUESTS?

-  One request depends on the previous request
- Order matters
- You need to control load

> Serial requests' execution can be implemented by reassigning `sequence` as we saw,
> Or, **by passing the array produced by `map()` to `Promise.all()`**

Suppose:

```js
const promises = urls.map((url) => getJSON(url));

const results = await Promise.all(promises);
```

The requests may **finish in random order**, but `Promise.all()` returns results in the **same order as the input Promises**.

Example:

```text
Requests:

A → finishes 3rd
B → finishes 1st
C → finishes 2nd
```

Completion order:

```text
B → C → A
```

But:

```js
await Promise.all([A, B, C]);
```

returns:

```text
[A, B, C]
```
---

> What if one promise inside the `.all()` fails? We will talk about that later.

---

### Most important assessment points

1. **Parallel requests can complete in a different order from the order in which they were started.**
2. **`forEach()` does not wait for asynchronous callbacks.**
3. **`map()` does not make asynchronous operations serial.**
4. **`Promise.all()` allows concurrent operations and preserves the order of the input Promises in its result.**
5. **Serial execution means the next operation waits for the previous one.**
6. **Reassigning `sequence` extends the Promise chain; without reassignment, every iteration starts from the same original Promise.**
7. **Use parallel execution for independent requests.**
8. **Use serial execution when operations depend on one another or when execution order itself matters.**
9. **For a large number of independent requests, controlled concurrency is often better than either "everything at once" or "strictly one at a time."**

