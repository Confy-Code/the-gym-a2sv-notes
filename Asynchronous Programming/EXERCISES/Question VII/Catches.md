## QUESTION VII - CATCHES & HINTS
---

1. `response.json()` returns a promise! That is why you'd have to `await` it before.
2. First filter the array, and map later
3. Again we use `console.dir({depth: null})` as some object's properties are deeply nested.