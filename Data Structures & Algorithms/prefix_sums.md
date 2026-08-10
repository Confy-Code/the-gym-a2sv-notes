### PREFIX SUMS

> Prefix sums are a preprocessing technique used to efficiently calculate **range sums** and handle repeated operations over arrays or matrices.

---

### 1. Difference Arrays

> **Key idea:** Deal with only the **ends/boundaries** of a range instead of updating every element inside it.

If an operation affects a contiguous range `[L, R]`:

    diff[L] += change
    diff[R + 1] -= change

Then use a **prefix sum** over the difference array to reconstruct the actual changes at every position.

### Pattern to Recognize

Think **Difference Array + Prefix Sum** when:

- Many operations modify contiguous sub-arrays.
- Each operation affects a range `[L, R]`.
- You only need the final state after all operations.
- There are many overlapping range updates.

> **Mental trigger:**  
> **"Many range updates → mark the boundaries → prefix sum."**

---

## 2. Circular Shifting / Alphabet Shifting

When values exist in a **cyclic range**, use modulo to wrap around.

For the alphabet:

    a b c d ... x y z
    0 1 2 3 ... 23 24 25

There are `26` possible states, so use:

    shift % 26

### Character Shifting Formula

    chr((ord(char) - ord('a') + shift) % 26 + ord('a'))

### How It Works

Convert the character to a number:

    ord(char) - ord('a')

Apply the shift:

    index + shift

Wrap around the alphabet:

    (index + shift) % 26

Convert the result back:

    chr(...)

### Example

    z + 1

    25 + 1 = 26
    26 % 26 = 0
    0 → a

    Therefore:
    z → a

But:

    z + 0

    25 + 0 = 25
    25 % 26 = 25
    25 → z

    Therefore:
    z → z

> **Mental trigger:**  
> **"Something repeats after N states → use modulo N."**

This also applies to:

- Circular arrays → `% n`
- Days of the week → `% 7`
- Clock positions → `% 12`
- Directions → `% 4`
- Musical notes → `% 12`
- Alphabet → `% 26`

### Done Questions

- [Shifting Letters](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/0848-shifting-letters)
- [Shifting Letters II](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/2381-shifting-letters-ii)

---

# 3. 1D Prefix Sums

Given:

    A = [2, 5, 1, 8, 3]

A prefix sum stores cumulative sums so that range sums can be answered in `O(1)`.

---

## 3.1 Inclusive Prefix Sum

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

## 3.2 Exclusive Prefix Sum

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

# 4. 2D Prefix Sums

The same idea extends from an array to a **matrix**.

Example:

    1  2  3
    4  5  6
    7  8  9

Instead of storing the sum before only one position, we store the sum of the entire rectangle from the top-left corner to `(r, c)`.

---

## 4.1 Inclusive 2D Prefix Sum

> `P[r][c]` contains the sum of everything from `(0,0)` to `(r,c)`.

### Building Formula

    P[r][c] =
        matrix[r][c]
        + P[r-1][c]
        + P[r][c-1]
        - P[r-1][c-1]

The subtraction is necessary because the top-left region is counted **twice**.

This is the **2D inclusion-exclusion principle**.

---

## 4.2 Exclusive 2D Prefix Sum

The easier implementation usually adds:

    +1 row
    +1 column

of zeros.

If the original matrix is:

    3 × 4

the prefix matrix becomes:

    4 × 5

Example:

    prefix = [
        [0] * (cols + 1)
        for _ in range(rows + 1)
    ]

Then:

    P[r][c]

corresponds to:

    matrix[r-1][c-1]

Therefore:

    P[r][c] =
        matrix[r-1][c-1]
        + P[r-1][c]
        + P[r][c-1]
        - P[r-1][c-1]

> **Important:** When using the extra row and column, the prefix indices are shifted by `+1`, while the original matrix indices need `-1`.

---

# 5. 2D Range Sums

For a rectangular region:

    (row1, col1) → (row2, col2)

the idea is the same as 1D, but now we use **2D inclusion-exclusion**.

## Inclusive Prefix Formula

    Sum =
        P[r2][c2]
        - P[r1-1][c2]
        - P[r2][c1-1]
        + P[r1-1][c1-1]

### Why `+` at the End?

The top-left region was subtracted **twice**, so we add it back once.

    Entire rectangle
    - Top unwanted region
    - Left unwanted region
    + Top-left overlap
    = Desired region

---

## Exclusive Prefix Formula

If using the `(rows + 1) × (cols + 1)` prefix matrix:

    Sum =
        P[r2+1][c2+1]
        - P[r1][c2+1]
        - P[r2+1][c1]
        + P[r1][c1]

This version has **no boundary exceptions**.

### Done Question

- [Range Sum Query 2D - Immutable](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/0304-range-sum-query-2d-immutable)

---

# 6. How to Recognize Prefix-Sum Problems

### Range Queries

Look for:

    "Find the sum from L to R."
    "Find the sum of this submatrix."
    "Answer many range sum queries."

→ **Prefix Sum**

---

### Range Updates

Look for:

    "Add X to every element from L to R."
    "Apply multiple operations to contiguous ranges."
    "Increase/decrease all values in a range."

→ **Difference Array + Prefix Sum**

---

### Cyclic Values

Look for:

    "Shift letters."
    "Move around a circular array."
    "Rotate positions."
    "Wrap around after N states."

→ **Modulo `% N`**

---

# 7. Big Picture

                    PREFIX SUM PATTERN
                           │
             ┌─────────────┴─────────────┐
             │                           │
            1D                           2D
             │                           │
      ┌──────┴──────┐             ┌──────┴──────┐
      │             │             │             │
  Inclusive     Exclusive     Inclusive     Exclusive
      │             │             │             │
 P[R]-P[L-1]   P[R+1]-P[L]   Inclusion-     +1 row &
                             Exclusion      +1 column
             │
             ▼
      Range Updates
             │
             ▼
      Difference Array
             │
             ▼
         Prefix Sum

---

# 8. Core Mental Models

    Many range SUM queries
            ↓
        Prefix Sum


    Many range UPDATES
            ↓
      Difference Array
            ↓
        Prefix Sum


    Cyclic / wrapping values
            ↓
          Modulo

> **Main Hint:**  
> **Performing regular changes or queries over contiguous sub-arrays/submatrices is a strong signal to think about prefix sums or difference arrays.**