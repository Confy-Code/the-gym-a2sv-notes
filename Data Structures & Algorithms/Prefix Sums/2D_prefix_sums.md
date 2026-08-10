### Prefix Sums - 2D Prefix Sums

The same idea extends from an array to a **matrix**.

Example:

    1  2  3
    4  5  6
    7  8  9

Instead of storing the sum before only one position, we store the sum of the entire rectangle from the top-left corner to `(r, c)`.

---

### 1.1 Inclusive 2D Prefix Sum

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

### 1.2 Exclusive 2D Prefix Sum

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

# 2. 2D Range Sums

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