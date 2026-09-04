## ASYNCHRONOUS PROGRAMMING - QUESTION V
---

Write a JavaScript program that converts this callback-based function to a promise-based function.

```js
function fetchData(callback) {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      callback(null, data);
    }, 1000);
  }
  
  fetchData((error, data) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log(data);
    }
  });
  ```
