let count  = 0;

async function pollUntilDone(maxAttempts){
    const url = "/api/job-status"

    let controller = new AbortController()
    let {signal} = controller;

    let timerID = setInterval(() => {
        
        (async function helper(){
            count ++

            try{
                const response = await fetch(url, {signal: signal});

                const result = await response.text()

                if (result == "done"){
                    console.log("The API has returned done")
                    controller.abort(); // to abort anything that is still running in the backgrounf
                    clearInterval(timerID); // clear the interval
                }

                else if (count >= maxAttempts){
                    console.log("You have reached the maximum attempts")
                    controller.abort()
                    clearInterval(timerID)
                }
            }

            catch(error) {
                if(error.name == "AbortError"){
                    console.log("Request aborted due to timeout")
                }
                
                return {Error: error}
            }
        })(); // IIFE
    }, 2000)
}