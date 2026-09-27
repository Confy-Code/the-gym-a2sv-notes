// PREDICT THE OUTPUT

console.log("1");

setTimeout(() => {
  console.log("2");

  Promise.resolve().then(() => {
    console.log("3");
  });
}, 0);

(async () => {
  console.log("4");

  await Promise.resolve();

  console.log("5");

  setTimeout(() => {
    console.log("6");
  }, 0);

  Promise.resolve().then(() => {
    console.log("7");
  });
})();

new Promise((resolve) => {
  console.log("8");
  resolve();
}).then(() => {
  console.log("9");

  Promise.resolve().then(() => {
    console.log("10");
  });
});

setTimeout(() => {
  console.log("11");
}, 0);

console.log("12");
