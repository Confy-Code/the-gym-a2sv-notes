async function fetchUrl(url){
    try{
        const response = await fetch(url)
        if (!response.ok) throw new Error("HTTP Request Not found")
        
        return await response.json()
    }
    catch (error) {
        return error
    }
}

async function fetchMultipleAPIs(apiUrls){
    const promises = apiUrls.map(url => fetchUrl(url))
    const results = await Promise.allSettled(promises)

    return results
}

// TEST

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