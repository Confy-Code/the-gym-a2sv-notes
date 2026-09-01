async function fetchData() {
    try{
        return setTimeout(() => {
            const data = "Data fetched successfully!";
            return data
            }, 1000);

    } catch(error){
        console.log(error)}
}
  
fetchData().then((data) => console.log(data)).catch((error) => console.error("Error:", error));