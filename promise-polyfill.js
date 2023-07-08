function MyPromise(executor) {
  let onResolve,
    onReject,
    isCalled = false,
    isFullfilled = false,
    isRejected = false,
    value;

  this.then = function (cb) {
    onResolve = cb;
    if (isFullfilled && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };
  this.catch = function (cb) {
    onReject = cb;
    if (isRejected && !isCalled) {
      onReject(value);
      isCalled = true;
    }
    return this;
  };

  function resolve(val) {
    isFullfilled = true;
    value = val;
    if (typeof onResolve === "function" && !isCalled) {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(reason) {
    isRejected = true;
    value = reason;
    if (typeof onResolve === "function" && !isCalled) {
      onReject(reason);
      isCalled = true;
    }
  }

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.resolve = function (val) {
  return new MyPromise((resolve, reject) => {
    resolve(val);
  });
};

MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val);
  });
};

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (promises.length === 0) {
      resolve(promises);
      return;
    }
    let count = 0;
    const result = [];

    function done(val, i) {
      result[i] = val;
      count++;
      if (count === promises.length) resolve(result);
    }
    
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((val) => done(val, i))
        .catch((error) => reject(error));
    }
  });
};

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve).catch(reject);
    }
  });
};
