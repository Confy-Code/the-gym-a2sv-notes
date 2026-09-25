async function pollUntilDone(maxAttempts){
    count = 0;
    const url = "/api/job-status";

    async function poll(){
        count ++

        try{
            let response = await fetch(url)
            if (!response.ok) throw new Error("HTTP Request not Found")
            let result = response.text()

            if (result == "done"){
                console.log("The API has returned done")
                return ;
            }

            if (count >= maxAttempts){
                const err = "Maximum Attempts Reached"
                throw new Error(err)
                return;
            }

            setTimeout(poll, 2000)
        }

        catch(error) { return {Error: error} }
    }

    return poll()
}