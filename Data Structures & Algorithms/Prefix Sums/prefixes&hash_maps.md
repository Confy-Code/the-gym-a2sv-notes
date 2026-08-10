## Recording Frequencies with Hash Maps

Sometimes, we don't only need to know **whether** a value has appeared — we need to know **how many times** it has appeared.

### Prefix Sum Example — LeetCode 560

> [Assess the question and our answer here](https://github.com/Confy-Code/My_Leetcode_solutions/tree/main/0560-subarray-sum-equals-k)

In `Subarray Sum Equals K`, each prefix sum represents a **boundary**.

If the same prefix sum appears multiple times, there are multiple possible starting boundaries for valid subarrays.

Therefore, we record:

    prefix sum → number of times it has appeared

For example:

    prefix = [0, 3, 3, 3]

    0 → 1
    3 → 3

The update:

    counts[prefix_sum] = counts.get(prefix_sum, 0) + 1

means:

> Record how many boundaries have this same prefix sum.

Then:

    result += counts[needed_sum]

means:

> Add the number of previous boundaries that can form a valid subarray with the current boundary.

### Why Use a Hash Map?

A hash map allows us to quickly ask:

    "Have I seen this value before?"
    "How many times have I seen it?"

Average lookup/insertion:

    O(1)

This avoids repeatedly searching through previous values, which can turn an `O(n²)` solution into an `O(n)` solution.

### Patterns That Suggest Recording in a Hash Map

Think **Hash Map + Frequency** when the problem asks for:

- How many times something has appeared.
- Number of duplicates or repetitions.
- Number of pairs/combinations satisfying a condition.
- Number of subarrays satisfying a condition.
- Number of previous values satisfying a condition.
- Whether a previous value/state has been seen.
- Counting elements, characters, prefix sums, remainders, or states.

### Mental Trigger

> **"I need to repeatedly ask about previous values → record them in a hash map."**

> **If the question asks "how many?" → store frequencies, not just existence.**