### PREFIX SUMS - 1D Prefix Sums

Given:

    A = [2, 5, 1, 8, 3]

A prefix sum stores cumulative sums so that range sums can be answered in `O(1)`.

---

### 1.1 Inclusive Prefix Sum

> **The current element is included.**

Formula:

    P[i] = A[0] + A[1] + ... + A[i]

Example:

    A      = [2, 5, 1, 8, 3]
    Prefix = [2, 7, 8, 16, 19]

### Range Sum

For a range `[L, R]`:

    Sum(L, R) = P[R] - P[L - 1]

### Exception

When:

    L == 0

there is no `P[L - 1]`.

Therefore:

    Sum(0, R) = P[R]

### Summary

    L > 0:
    P[R] - P[L - 1]

    L == 0:
    P[R]

---

### 1.2 Exclusive Prefix Sum

> **The current element is NOT included.**

An extra `0` is placed at the beginning.

    A      = [2, 5, 1, 8, 3]
    Prefix = [0, 2, 7, 8, 16, 19]

The prefix array has size:

    n + 1

### Range Sum

For `[L, R]`:

    Sum(L, R) = P[R + 1] - P[L]

### Advantage

There are **no special cases**.

Even when:

    L == 0

the same formula works:

    P[R + 1] - P[0]

Since:

    P[0] = 0

> **Mental trigger:**  
> Exclusive prefix sums are often cleaner because the extra `0` eliminates boundary exceptions.

### Done Questions

- [Range Sum Query - Immutable](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/0303-range-sum-query-immutable)
- [Running Sum of 1D Array](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/1480-running-sum-of-1d-array)

---
