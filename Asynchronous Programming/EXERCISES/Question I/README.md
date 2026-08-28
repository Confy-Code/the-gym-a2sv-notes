### Asynchronous JavaScript - Question 1

Create a function called `fetchUserTodos` that uses the `Promise.all()` 
method to fetch users and todos concurrently from the provided API endpoints and combine them based on the userId. 

The function should return a promise that resolves with the combined data.

- Users endpoints `https://jsonplaceholder.typicode.com/users`
- Todos endpoints `https://jsonplaceholder.typicode.com/todos`

The returned promise should resolve into an array of users, where each user object has a new `key`, `todos`. This key should contain an array of todos that belong to the user, determined by matching the userId of the todo with the id of the user.

User object may look like:

```js
{
    id: 10,
    name: 'Clementina DuBuque',
    //   ...
}
```

Todo object may look like:

```js
{
    userId: 5,
    completed: false,
    //     ...
}
```

The result array will have objects that look like:

```js
{
   id: 10,
 name: 'Clementina DuBuque',
 todos: [
       {
           userId: 10,
         completed: false,
           ...
       },
       {
           userId: 10,
         completed: false,
           ...
       }
   ]
   ...
}
```
