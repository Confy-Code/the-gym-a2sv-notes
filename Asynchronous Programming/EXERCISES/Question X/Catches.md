## QUESTION X - Hints

---

- The Promise should immediately reject with `Delay is not sufficient` message if delay is less than 2 seconds. 
- Talking about 'immediately', we didn't wrap it up inside `setTimeout()`, because it would wait for some seconds. Instead we rejected it right off the `setTimeout()`, unlike the `resolve()` which we called inside the timer.