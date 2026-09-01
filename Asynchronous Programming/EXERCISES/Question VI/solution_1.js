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
    }catch(error){
        console.log()
    }
}


asyncCounter()