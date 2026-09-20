## JAVASCRIPT ASYNCHRONOUS PROGRAMMING - QUESTION XI

---

1. Write a JavaScript function that fetches data from multiple APIs concurrently and returns a combined result using Promises
    
    ```bash
    const apiUrls = [
      'https://jsonplaceholder.typicode.com/posts/4',
      'https://jsonplaceholder.typicode.com/posts/5',
      'https://jsonplaceholder.typicode.com/posts/6'
    ];
    
    fetchMultipleAPIs(apiUrls)
      .then(results => {
        console.log('Combined Results:', results);
      })
      .catch(error => {
        console.log('Error:', error.message);
      });
    ```