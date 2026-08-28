const controller = new AbortController()
const signal = controller.signal

const url = "https://jsonplaceholder.typicode.com/users"

const timer = setTimeout(() => controller.abort(), 5000)

async function fetchUrl(url){
    try{
        const response = await fetch(url, {signal: signal})

        if(!response.ok){
            throw new Error("HTTP Request denied")
        }

        return response.json()
    }
    catch(error){
        if(error.name == "AbortError"){
            return "Request Aborted after 5 seconds due to timeout"
        }else{
            console.log(error)
        }
    }

    finally{
        clearTimeout(timer)
    }

}

// TESTING

fetchUrl(url)
.then((data) => console.log(data))
.catch((error) => console.log(error))
