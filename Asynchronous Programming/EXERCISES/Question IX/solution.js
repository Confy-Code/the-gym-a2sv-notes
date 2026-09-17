async function createTimer(ms, signal){
    const timerPromise = new Promise((resolve) => {
        const timerId = setTimeout(() => {
            resolve("Timed out: Aborting Fetch ...")
        }, ms)

        if (signal) {
            signal.addEventListener("abort", () => clearTimeout(timerId))
        }
    })

    return timerPromise
}

async function fetchWithTimeout(url, timeoutMs){
    const controller = new AbortController()
    const {signal} = controller

    const timer = createTimer(timeoutMs, signal)

    try{

        const fetchPromise = fetch(url).then((response) => {
            if (!response.ok) throw new Error("Server returned an error")
            return response.json()
        })

        const fastPromise = await Promise.race([fetchPromise, timer])

        controller.abort()
        return fastPromise

    }
    catch(err){
        controller.abort()
        return {Error: err}
    }

}

fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1", 6000).then((data) => console.log(data))