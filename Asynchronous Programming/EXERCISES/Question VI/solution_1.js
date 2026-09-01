function delay(){
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve()}, 
    1000);
});
}

async function asyncCounter(){
    try{
        for(let num = 1; num <=5; num++){
            console.log(num)
            await delay()
        }

        return [1, 2, 3, 4, 5]

    }catch(error){
        console.log()
    }
}


asyncCounter().then((arr) => console.log(arr) )