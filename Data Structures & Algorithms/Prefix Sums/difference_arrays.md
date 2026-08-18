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
