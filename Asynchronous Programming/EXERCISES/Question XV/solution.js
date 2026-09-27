const arr = [21, 3, 4, 2, 6, 87, 21, 3, 4]

arr.forEach((el) => setTimeout(() => {
    console.log(el)
}, el * 10))  // Add any scalar after el
