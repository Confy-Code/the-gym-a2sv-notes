async function fetchUrl(url){
    try{
        const response = await fetch(url)
        if (!response.ok){
            throw new Error("HTTP Requests Denied")
        }
        return response.json()
    }
    catch (error){
        console.log(`${error} for ${url} `)
    }
}

async function getUrls(url1, url2, url3){
    try{
        const fastPromise = await Promise
        .any([fetchUrl(url1), fetchUrl(url2), fetchUrl(url3)])

        return fastPromise
    }

    catch(error){
        console.log(error)
    }

}

async function getFastPosts(){
    try{return await getUrls(url1, url2, url3)}
    catch(error){console}
    
}

// TESTING

const url1 = "https://dummyjson.com/posts"
const url2 = "https://this-may-not-exist.com/posts"
const url3 = "https://jsonplaceholder.typicode.com/posts"


getFastPosts().then((posts) => {
    console.log(posts)
})
