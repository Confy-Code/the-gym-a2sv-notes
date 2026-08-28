## JavaScript Asynchronous Programming - Random Questions 1

=============================================================

### 1. What do you understand about Thenables and what are their relationships to the Promises?

A **thenable** is any JavaScript object that has a callable `.then()` method.

It does **not** have to be an actual/native `Promise`.

```js
const thenable = {
    then(resolve, reject) {
        resolve("Done!");
    }
};
```

This object is a thenable because it has `.then()`.

```js
thenable.then(value => {
    console.log(value); // Done!
});
```

### Native Promise vs Thenable

> Every native Promise is a thenable because every Promise has `.then()`.

However:

> **Every native Promise is a thenable, but not every thenable is a native Promise.**

```js
const promise = Promise.resolve("Hello");

console.log(typeof promise.then); // "function"
console.log(promise instanceof Promise); // true
```

But:

```js
const thenable = {
    then(resolve) {
        resolve("Hello");
    }
};

console.log(typeof thenable.then); // "function"
console.log(thenable instanceof Promise); // false
```


### Simple mental model

```text
Thenable
   |
   +---- Native Promise
   |
   +---- Custom object with .then()
   |
   +---- Other Promise-like objects
```

**Promise = specific built-in object**

**Thenable = anything that behaves Promise-like by providing `.then()`**

---

### 2. What are async generators and iterators, how do they work, and what are their use cases?

> For basic synchronous generators and iterators, check them in last sections [here](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/EcmaScript_6.md)

An **async generator** is a generator function declared with:

```js
async function*
```

Example:

```js
async function* numbers() {
    yield 1;

    await new Promise(resolve =>
        setTimeout(resolve, 1000)
    );

    yield 2;

    yield 3;
}
```
---

#### Async Iterator

An async iterator is an object that has:

```js
Symbol.asyncIterator
```

and whose `.next()` returns a **Promise**.

A normal iterator:

```js
iterator.next()
```

returns:

```js
{
    value: ...,
    done: ...
}
```

An async iterator:

```js
asyncIterator.next()
```

returns:

```js
Promise<{
    value: ...,
    done: ...
}>
```

Example:

```js
const generator = numbers();

generator.next().then(result => {
    console.log(result);
});
```

The result eventually looks like:

```js
{
    value: 1,
    done: false
}
```

### Important distinction

```text
Normal Iterator
    next()
      ↓
{ value, done }


Async Iterator
    next()
      ↓
Promise<{ value, done }>
```

---

## Why use Async Generators?

They are useful when values become available **over time** rather than all at once.

Common use cases:

* streaming API responses
* reading files/chunks
* database records, ...

---

### 2.1 FOR AWAIT...OF

===================

`for await...of` is used to consume **async iterables**.

Example:

```js
async function* numbers() {
    yield 1;
    yield 2;
    yield 3;
}

async function run() {
    for await (const number of numbers()) {
        console.log(number);
    }
}

run();
```

#### How does it work?

Conceptually:

```text
for await...of
      ↓
gets Symbol.asyncIterator
      ↓
calls .next()
      ↓
gets a Promise
      ↓
awaits the Promise
      ↓
gets { value, done }
      ↓
processes value
      ↓
calls .next() again
```

So:

```js
for await (const value of iterable)
```

is designed to handle asynchronous iteration.

### Important

`for await...of` can work with:

* async iterables
* regular synchronous iterables

With a synchronous iterable, it will still await the values if necessary.

---
