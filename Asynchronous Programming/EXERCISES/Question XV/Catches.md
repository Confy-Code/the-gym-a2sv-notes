## QUESTION XV - CATCHES

1. We used a technique of **Novelty sorting**.

> This sorting mechanism is discouraged though, due that it relies on hardware clock, among other factors.

2. For each value, we delay with exact (milliseconds * 100), having milliseconds equal to the value.

> We prevented (milliseconds * 1000) which would turn into seconds, because it would take much time to log values.
> Imagine if we had '42' in our array; that would have us to wait for 42 seconds !!

> We used (el * 100) milliseconds, but you can use any constant after `el`.

3. What if you write just `el` with no operation after it?

> Try it with [1, 0]. Will it be sorted ? No

> This is because, delaying for 1ms is relatively a very short time, hence `1` will be logged before `0`. But if we add a
constant even if it would be `el + 1`, `0` have time to step out before `1` does.

4. This Novelty sorting is possible because `.forEach()` loops through the elements of the array at a higher speed, and this makes
all elements of the array to be accessed approximately at the same time.
