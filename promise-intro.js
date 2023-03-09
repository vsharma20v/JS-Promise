// syntax 1
const subscribe = new Promise((resolve, reject) => {
  setTimeout(() => {
    const result = true;
    if (result) resolve("Promise is resolve");
    else reject(new Error("Promise is rejected"));
  }, 2000);
});

subscribe
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });

// syntax 2
const subsResolve = Promise.resolve("Promise is resolved");
console.log(subsResolve); // promise is fullfilled immediately, but still it is an asynchronous operation
subsResolve.then((res) => console.log(res)); // this is still an asynchronous operation

const subsReject = Promise.reject("Promise is rejected");
console.log(subsReject); // promise is reject immediately, but still it is an asynchronous operation
subsReject.then(
  (res) => console.log(res),
  (rej) => console.log(rej)
); // this is still an asynchronous operation

// syntax 3 - promise hell
importantMessage("Vaibhav")
  .then((res) => {
    console.log(res);
    likeTheVideo("vaibhav's").then((res) => {
      console.log(res);
      shareTheVideo("vibhu's").then((res) => console.log(res));
    });
  })
  .catch((err) => console.log(err));

// syntax 4 - promise combinator Promise.all()
const responseArray = Promise.all([
  importantMessage("Vaibhav"),
  likeTheVideo("vaibhav's"),
  shareTheVideo("vibhu's"),
]);

responseArray
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//   syntax 5 - promise combinator Promise.race()
const responseArra = Promise.race([
  importantMessage("Vaibhav"),
  likeTheVideo("vaibhav's"),
  shareTheVideo("vibhu's"),
]);
responseArra
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// syntax 6 - promise combinator Promise.allSettled()
const responseArr = Promise.allSettled([
  importantMessage("Vaibhav"),
  likeTheVideo("vaibhav's"),
  shareTheVideo("vibhu's"),
]);
responseArr
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

// syntax 7 - promise combinator Promise.any()
const responseAr = Promise.any([
  importantMessage("Vaibhav"),
  likeTheVideo("vaibhav's"),
  shareTheVideo("vibhu's"),
]);
console.log(responseAr);
responseAr
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

console.log("end");

// async/await
const result = async () => {
  try {
    const message1 = await importantMessage("Vaibhav Sharma");
    console.log(message1);
    const message2 = await likeTheVideo("vaibhav");
    console.log(message2);
    const message3 = await shareTheVideo("vibhu");
    console.log(message3);
    console.log("hi");
    console.log(message1, message2, message3);
  } catch (error) {
    console.error(error);
  }
};
