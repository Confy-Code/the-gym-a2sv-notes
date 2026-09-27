## QUESTION XV - CATCHES

1. We used a technique of **Novelty sorting**.

> This sorting mechanism is discouraged though, due that it relies on hardware clock, among other factors.

2. For each value, we delay with exact (milliseconds * 10), having milliseconds equal to the value.

> We prevented (milliseconds * 1000) which would turn into seconds, because it would take much time to log values.
> Imagine if we had '42' in our array; that would have us to wait for 42 seconds !!

> We used (el * 10) milliseconds, but you can use any constant after `el`.

3. **What if you write just `el` with no operation after it?**

> Try it with [1, 0]. Will it be sorted ? No

> This is because delaying by 1 ms is a relatively short time; hence, `1` will be logged before `0`. But if we add a constant, even if it is `el + 1`, `0` will have time to step out before `1` does.

4. This Novelty sorting is possible because `.forEach()` loops through the elements of the array at high speed, and this makes all elements of the array be able to be accessed almost at the same time.
