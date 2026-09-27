// PREDICT THE OUTPUT

console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

  setTimeout(() => {
    console.log("D");
  }, 0);
}, 0);

Promise.resolve().then(() => {
  console.log("E");

  Promise.resolve().then(() => {
    console.log("F");
  });
});

new Promise((resolve) => {
  console.log("G");
  resolve();
}).then(() => {
  console.log("H");

  setTimeout(() => {
    console.log("I");
  }, 0);
});

console.log("J");
