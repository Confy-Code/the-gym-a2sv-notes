async function usersAddresses(url){
    try{
        const response = await fetch(url)

        if(!response.ok){
            throw new Error("HTTP Request Not Found")
        }

        const usersInfo = await response.json()

        return usersInfo
        .filter((user) => user.id <= 3)
        .map((user) =>  {
            return {
                "address" : user.address
            }
        });
    
    }catch (error){console.log(error)}
}

const url = "https://jsonplaceholder.typicode.com/users"

usersAddresses(url).then((data) => console.dir(data, {depth: null}))