// example 1 - output = start 1 end 3
console.log("start");
const p = new Promise((res, rej) => {
  console.log(1);
  res(3);
});

p.then((res) => console.log(res));
console.log("end");

// example 2 - output = start 1 2 end 3
console.log("start");
const p1 = new Promise((res, rej) => {
  console.log(1);
  res(3);
  console.log(2);
});

p1.then((res) => console.log(res));
console.log("end");

// example 3 - output = start 1 2 end
console.log("start");
const p2 = new Promise((res, rej) => {
  console.log(1);
  console.log(2);
});

p2.then((res) => console.log(res));
console.log("end");

// example 4 - output = start middle 1 end resolve
console.log("start");
const fn = () =>
  new Promise((res, rej) => {
    console.log(1);
    res("resolve");
  });
console.log("middle");
fn().then((res) => {
  console.log(res);
});
console.log("end");

// example 5 - output = e1 s4
function job() {
  return new Promise((res, rej) => {
    rej();
  });
}

const promise = job();
promise
  .then(() => console.log("s1"))
  .then(() => console.log("s2"))
  .then(() => console.log("s3"))
  .catch(() => console.log("e1"))
  .then(() => console.log("s4"));

// example 6 - output = success error Error caught
function job(state) {
  return new Promise((res, rej) => {
    if (state) res("success");
    else rej("error");
  });
}

const p3 = job(true);
p3.then((data) => {
  console.log(data);
  return job(false);
})
  .catch((error) => {
    console.log(error);
    return "Error caught";
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((error) => console.log(error));

// example 7 - output = success Default error Error caught success:test
function job(state) {
  return new Promise((res, rej) => {
    if (state) res("success");
    else rej("error");
  });
}
const promise1 = job(true);
promise1
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .then((data) => {
    if (data !== "victory") {
      throw "Default";
    }
    return job(true);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
    return job(false);
  })
  .then((data) => {
    console.log(data);
    return job(true);
  })
  .catch((error) => {
    console.log(error);
    return "Error caught";
  })
  .then((data) => {
    console.log(data);
    return new Error("test");
  })
  .then((data) => {
    console.log("success:", data.message);
  })
  .catch((data) => {
    console.log("error:", data.message);
  });

// example 8 - output = first
const firstPromise = new Promise((res, rej) => {
  res("first");
});
const secondPromise = new Promise((res, rej) => {
  res(firstPromise);
});
secondPromise
  .then((p) => p)
  .then((data) => {
    console.log(data);
  });