async function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}

async function demo() {  
	console.log('starting');
	await sleep(1000);
	console.log('one second later');
}

demo()
