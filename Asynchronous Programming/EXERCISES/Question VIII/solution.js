// SOLUTION QUESTION VIII
let counter = 0;
let waitline = [];

async function fetchUrl(url, limit){

    if (counter >= limit){
        const lock = new Promise(resolve => waitline.push(resolve))   // Stealing the key (store it somewhere else -- Array)
        // console.log(waitline)   // Array contains [[function: resolve]] 
        await lock  // the function pauses here
    }

    counter ++  // counts the requests now in flight

    console.log(`${counter} urls in flight`)

    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error("HTTPS Request not found")
        console.log(`${url} Fetched successfully`)

        return await response.json()
    }

    catch (error){
        console.log(`${url} Fetch failed successfully :\)`)
        return {error: error.message}
        
        }
    finally {
        counter --

        if (waitline.length > 0){
            newTask = waitline.shift()  // retrieves the [fumction: resolve]]
            newTask() // becomes resolve(), hence un-pauses the function by escaping the await keyword
        }
    }
}

async function fetchAllWithLimit(urls, limit){
    const promises = urls.map(url=> fetchUrl(url, limit))  // map into array of promises

    return await Promise.allSettled(promises)
}

// TESTING

const testUrls = [
    'https://httpbin.org/delay',
    'https://httpbin.org',
    'https://typicode.com',
    'https://httpbin.org',
    'https://httpbin.org'
];

fetchAllWithLimit(testUrls, 2)
