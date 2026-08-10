# Time and Space Complexities

Understanding **time complexity** and **space complexity** is one of the fundamental skills in algorithms, data structures, and software engineering. These concepts help us estimate how efficiently an algorithm performs as the size of its input grows.

Instead of measuring execution time in seconds (which depends on hardware, programming language, and compiler optimizations), we analyze how the **number of operations** and **memory usage** grow with the input size **n**.

> Note that this whole document uses Python Programming Language, but the complexities here are applied to anywhere else; only small differences in-between.

---

# 📚 Table of Contents

- [Time Complexity](#time-Complexity)
- [Cases of Time Complexity](#cases-of-time-complexity)
- [How to Analyze Time Complexity](#how-to-analyze-time-complexity)
- [Big O Simplification Rules](#big-o-simplification-rules)
- [Common Time Complexities](#common-time-complexities)
- [Space Complexity](#space-complexity)
- [Types of Space Complexity](#types-of-space-complexity)
- [Time vs Space Trade-off](#time-vs-space-trade-off)
- [Common Programming Errors](#common-programming-errors)
- [Complexity Cheat Sheet](#complexity-cheat-sheet)

---

# Time Complexity

Time complexity describes **how the running time of an algorithm grows as the input size increases**.

It measures the **number of elementary operations** an algorithm performs—not the actual execution time.

For example:

```python
for i in range(n):
    print(i)
```

The loop executes **n** times.

**Time Complexity:** `O(n)`

---

# Cases of Time Complexity

Different inputs may cause the same algorithm to perform differently.

## 1. Best Case

The **best case** is the minimum amount of work the algorithm performs.

Example:

```python
for x in arr:
    if x == target:
        return True
```

If the target is the first element:

**Complexity:** `O(1)`

---

## 2. Worst Case

The **worst case** is the maximum amount of work the algorithm performs.

Using the same example:

If the target is the last element or does not exist:

**Complexity:** `O(n)`

Worst-case analysis is the most commonly used because it guarantees the maximum running time.

---

## 3. Average Case

The **average case** estimates the expected running time over all possible inputs.

Example:

Linear search typically checks about half of the array.

**Complexity:** `O(n)`

---

## 4. Amortized Case

Amortized analysis measures the average cost of operations over a sequence of operations.

Some operations are occasionally expensive but happen infrequently.

Example:

```python
arr.append(x)
```

Most append operations:

`O(1)`

Occasionally Python resizes the list:

`O(n)`

**Amortized Complexity:** `O(1)`

---

# How to Analyze Time Complexity

The general process is:

1. Count the operations.
2. Analyze loops and iterations.
3. Consider conditional statements.
4. Look for recursion.
5. Account for nested operations.
6. Count function calls.
7. Express the mathematical relationship.
8. Simplify using Big O notation.

---

# 1. Count the Operations

Every assignment, comparison, arithmetic operation, and function call contributes to the total running time.

Example:

```python
a = b + c
```

Operations:

- Addition
- Assignment

Constant number of operations.

**Complexity:** `O(1)`

---

# 2. Analyze Loops and Iterations

Loops usually dominate an algorithm's running time.

### Example 1

```python
for i in range(3 * n):
    print(i)
```

Iterations:

`3n`

Ignore constants.

**Complexity:** `O(n)`

---

### Example 2

```python
for i in range(3 + n):
    print(i)
```

Iterations:

`n + 3`

Drop constants.

**Complexity:** `O(n)`

---

### Example 3

```python
for i in range(n):
    for j in range(n):
        print(i, j)
```

Outer loop:

`n`

Inner loop:

`n`

Total iterations:

`n × n = n²`

**Complexity:** `O(n²)`

---

# 3. Consider Conditional Statements

Conditions themselves are usually constant time.

```python
if x > y:
    ...
```

Comparison:

`O(1)`

However, always analyze the code inside each branch.

Example:

```python
if condition:
    for i in range(n):
        print(i)
```

Overall complexity:

`O(n)`

---

# 4. Look for Recursion

Recursive algorithms require analyzing how many recursive calls are made.

Example:

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

Recursive calls:

`n`

**Complexity:** `O(n)`

---

Binary Search:

```python
def binary_search(...):
```

The problem size is halved every recursive call.

**Complexity:** `O(log n)`

---

# 5. Account for Nested Operations

Sometimes a loop contains another expensive operation.

Example:

```python
for word in words:
    word.sort()
```

Suppose:

- There are **n** words.
- Each word has length **m**.

Sorting one word:

`O(m log m)`

Overall:

`O(n · m log m)`

---

# 6. Count Function Calls

Always include the complexity of functions being called.

Example:

```python
for x in array:
    process(x)
```

If

```python
process()
```

takes `O(n)`, then

`n × O(n)`

becomes

`O(n²)`

---

# Examples

## Example 1

```python
for x in array:
    mn = min(mn, x)
```

Each iteration performs one comparison.

Repeated **n** times.

**Complexity:** `O(n)`

---

## Example 2

```python
for x in array:
    mx = max(mx, x)
    mn = min(mn, x)
```

Each iteration performs:

- One `max()`
- One `min()`

Total:

`2n`

Ignore constants.

**Complexity:** `O(n)`

---

# Express the Relationship

After counting operations, express the total mathematically.

Example:

```
3n + 7
```

Simplifies to:

`O(n)`

---

Example:

```
5n² + 2n + 1
```

Simplifies to:

`O(n²)`

---

# Simplify to Big O

When writing Big O:

- Ignore constants.
- Ignore lower-order terms.
- Keep only the dominant term.

Examples:

| Expression | Big O |
|------------|-------|
| 5 | O(1) |
| 7n | O(n) |
| n + 100 | O(n) |
| 3n² + 2n | O(n²) |
| n³ + n² | O(n³) |

---

# Common Time Complexities

| Complexity | Name | Example |
|------------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary Search |
| O(n) | Linear | Linear Search |
| O(n log n) | Linearithmic | Merge Sort, Heap Sort |
| O(n²) | Quadratic | Nested loops |
| O(n³) | Cubic | Triple nested loops |
| O(2ⁿ) | Exponential | Recursive subsets |
| O(n!) | Factorial | Generating permutations |

---

# Space Complexity

Space complexity measures **how much additional memory an algorithm requires relative to the input size.**

It includes:

- Variables
- Arrays
- Lists
- Dictionaries
- Queues
- Stacks
- Recursion stack
- Dynamically allocated memory

---

# Types of Space Complexity

## Constant Space — O(1)

The algorithm uses the same amount of memory regardless of input size.

Example:

```python
maximum = 0

for x in arr:
    maximum = max(maximum, x)
```

Only a few variables are used.

**Space Complexity:** `O(1)`

---

## Linear Space — O(n)

Memory usage grows proportionally with the input.

Example:

```python
copy = []

for x in arr:
    copy.append(x)
```

The extra list stores **n** elements.

**Space Complexity:** `O(n)`

---

## Quadratic Space — O(n²)

Memory grows as the square of the input size.

Example:

```python
matrix = [[0] * n for _ in range(n)]
```

The matrix contains:

`n × n`

**Space Complexity:** `O(n²)`

---

## Recursive Space

Recursion consumes stack memory.

Example:

```python
factorial(n)
```

Maximum recursion depth:

`n`

**Space Complexity:** `O(n)`

---

# Time vs Space Trade-off

Sometimes we intentionally use more memory to make an algorithm faster.

Example:

Without a hash table:

**Time:** `O(n²)`

With a hash table:

**Time:** `O(n)`

Extra memory required:

**Space:** `O(n)`

This is known as the **time-space trade-off**.

---

# Common Programming Errors

## 1. TLE — Time Limit Exceeded

The program takes longer than the allowed execution time.

Common causes:

- Inefficient algorithms
- Too many nested loops
- Exponential recursion

Example:

Using `O(n²)` when `O(n log n)` is expected.

---

## 2. MLE — Memory Limit Exceeded

The program uses more memory than the allowed limit.

Common causes:

- Very large arrays
- Unnecessary copies of data
- Storing excessive intermediate results

---

## 3. Runtime Error (RTE)

The program crashes while executing.

Common causes:

- Division by zero
- Index out of bounds
- Null pointer access
- Stack overflow
- Infinite recursion

---

## 4. Idleness Limit Exceeded (ILE)

The program waits too long without producing output or responding.

Common causes:

- Infinite loops
- Waiting indefinitely for input
- Deadlocks
- Forgetting to flush output in interactive problems

---

# Complexity Cheat Sheet

| Operation | Time Complexity |
|-----------|-----------------|
| Array Access | O(1) |
| Insert at End of List (Amortized) | O(1) |
| Linear Search | O(n) |
| Binary Search | O(log n) |
| Hash Map Lookup (Average) | O(1) |
| Sorting | O(n log n) |
| Nested Loops | O(n²) |
| Triple Nested Loops | O(n³) |

---

# Summary

When analyzing an algorithm:

1. Count the operations.
2. Analyze loops and iterations.
3. Consider conditional statements.
4. Look for recursion.
5. Account for nested operations.
6. Count function calls.
7. Express the mathematical relationship.
8. Simplify using Big O notation.
9. Analyze additional memory usage (space complexity).

Mastering time and space complexity allows you to write efficient, scalable algorithms and avoid common performance issues such as **Time Limit Exceeded (TLE)**, **Memory Limit Exceeded (MLE)**, **Runtime Errors (RTE)**, and **Idleness Limit Exceeded (ILE)**.