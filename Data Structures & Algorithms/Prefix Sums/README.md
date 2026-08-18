### PREFIX SUMS

> Prefix sums are a preprocessing technique used to efficiently calculate **range sums** and handle repeated operations over arrays or matrices.

---

### How to Recognize Prefix-Sum Problems

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

### 2. Big Picture
    
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

### 3. Core Mental Models

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
