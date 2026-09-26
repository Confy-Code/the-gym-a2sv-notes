const loadReport = document.getElementById("LoadReport")
const cancel = document.getElementById("Cancel") 
const message = document.getElementById("message")


loadReport.addEventListener("click", startRequest) // not startRequest()
cancel.addEventListener("click", cancelRequest)


let controller = null;

async function startRequest(){
    try{

        message.textContent = "Request Has started"

        controller = new AbortController()
        const {signal} = controller
        const url = 'https://httpbin.org/delay/10'

        const response = await fetch(url, {signal})

        if(!response.ok) throw new Error("HTTP Request not found")

        return await response.json()
    }
    catch (err) {
        if (err.name == "AbortError"){
            message.textContent = "Request has been aborted"
        }
        else{message.textContent = err.message}
    }
}

function cancelRequest(){
    if (controller){
        controller.abort()
    }
}