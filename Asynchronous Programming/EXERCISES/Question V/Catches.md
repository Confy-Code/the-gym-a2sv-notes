## QUESTION V - CATCHES & HINTS
---

> We decided to use the approach of using try/ catch blocks rather than Promise Constructors. 

> This is the approach we've been using for all promises as it is cleaner.

1. The anonymous function (callback) inside the `setTimeout()` can return as normal functions do
2. This returned value is for the callback function inside the `setTimeout()`, not the parent/hosting function.
3. Returning the `setTimeout()` only, will return its `TimeoutID` only: 

```js
Timeout {
  _idleTimeout: 1000,
  _idlePrev: [TimersList],
  _idleNext: [TimersList],
  _idleStart: 23,
  _onTimeout: [Function (anonymous)],
  _timerArgs: undefined,
  _repeat: null,
  _destroyed: false,
  [Symbol(refed)]: true,
  [Symbol(kHasPrimitive)]: false,
  [Symbol(asyncId)]: 2,
  [Symbol(triggerId)]: 1,
  [Symbol(kAsyncContextFrame)]: undefined
}
```

4. You can see the property `_onTimeout()` is the one holding our callback function inside the `setTimeout()`.
5. So we will call the property to get the actual returned `data`. We will call `_onTimeout()` to see this returned value.
6. So to see the returned value inside the `setTimeout()` function, we `return setTimeout()._onTimeout()`.
