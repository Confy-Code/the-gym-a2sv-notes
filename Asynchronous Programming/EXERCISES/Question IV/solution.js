function myFetch(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', url)
        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status <= 300){
                const response = xhr.responseText
                resolve(response)
            }

            else {
                reject(Error())
            }
        }
        xhr.onerror = () => {throw new Error('Network Issue Detected')}

        xhr.send()
    })
}


// TESTING

myFetch('<https://jsonplaceholder.typicode.com/users>') // Failed fetch
.then(data => console.log(data))
.catch(error => console.log('Error:', error))