async function fetchUrl(url){
    try{
        const response = await fetch(url)

        if(!response.ok){
            throw new Error(`Unable to Fetch response from ${url}`)
        }

        return response.json()
    }

    catch(error) {
        console.log(error)
    }   
}

async function fetchUserTodos(users, todos){
    try{
        [users, todos] = await Promise.all([fetchUrl(users), fetchUrl(todos)])
        

        let usersTodos = users.map((user) => {
            return {
                'id' : user.id, 
                'name' : user.name,
                'todo' : todos.filter((todo) => todo.userId == user.id)
            }
        })

        return usersTodos
    }

    catch(error){
        console.log(Error(error))
    }
}

// TESTING

const users = "https://jsonplaceholder.typicode.com/users"
const todos = " https://jsonplaceholder.typicode.com/todos"

fetchUserTodos(users, todos).
then((response) => console.dir(response, {depth:null}))