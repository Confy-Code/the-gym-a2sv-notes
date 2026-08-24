## ASYNCHRONOUS PROGRAMMING - CHAINING THENABLES

> Remember that keyword `then` we talked about in the [promises_complexes file ?](https://github.com/Confy-Code/the-gym-a2sv-notes/blob/main/Asynchronous%20Programming/promises_complexes.md)
---

### Key Notes

- If we write `then(callback)`, this is a short form for `then(callback, null)`
- Meaning, `callback` is the `success-handler`, while `reject-handler` is assigned to `null`
- But, what if we interchange the handlers to `then(null, callback)`?
- `then(null, callback)` becomes a short form for `catch(callback)`
- `null` can also be replaced by `undefined`
- `then` can also have both handlers with none being set to `null`

From the Key notes we can conclude by saying that, the general structure of `then` is `then(success-handler, reject-handler)`.

---

### Mental Model Question
> This will give a bigger picture on the notes above

We have this code:

```js
var urls = [];
async('example.json')                 
.then(function(data) {
  urls = data.urls;                   // Fails at A
  return async(urls[0]);
})
.then(undefined, function(e) {
  console.log(1);
  return recovery();
})
.catch(function(e) {
  console.log(2);
  return recovery();             // Fails at B
})
.then(function() {
  console.log(3);
  return async(urls[1]);      // Fails at C
})
.then(async, function(e) {
  console.log(4);
  ahhhIGiveUp();
});
```

Questions:

```
If errors occur on A, what is logged?
If errors occur on B, what is logged?
If errors occur on C, what is logged?

(Errors occur only on the line specified throughout the whole code)
- "If there is an error with this recovery() function ... in this case nothing will show up in the log."
```

Answers:

```
A -> 1, 3
B -> None
C -> 4
```

Explanations:

```
Code fails at A
→ next reject-handler runs
→ logs 1
→ recovery succeeds
→ chain returns to success path
→ logs 3
```

```
-> Code Fails at B
-> As the error happens inside the recovery(), then it logs nothing
```

```
-> Block C runs
-> Fails at C
-> goes to the next reject handler
-> Logs 4
```

Question credits from: [Pittman](https://twitter.com/cwpittman)
