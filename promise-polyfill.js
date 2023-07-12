function MyPromise(executor) {
  let onResolve,
    onReject,
    value,
    isFullfilled = false,
    isRejected = false,
    isCalled = false;

  function resolve(val) {
    value = val;
    isFullfilled = true;

    if (typeof onResolve === "function" && !isCalled) {
      onResolve(val);
      isCalled = true;
    }
  }
  function reject(reason) {
    value = reason;
    isRejected = true;

    if (typeof onReject === "function" && !isCalled) {
      onReject(val);
      isCalled = true;
    }
  }

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

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason);
  });
};

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => {
    resolve(value);
  });
};

MyPromise.all = function (promises) {
  const result = [];
  let completedPromises = 0;
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((value) => {
          result[i] = value;
          completedPromises++;
          if (completedPromises === promise.length) resolve(result);
        })
        .catch(reject);
    }
  });
};

MyPromise.allSettled = function (promises) {
  const result = [];
  let completedPromises = 0;
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((value) => {
          result[i] = { status: "fulfilled", value };
        })
        .catch((error) => {
          result[i] = { status: "rejected", reason: error };
        })
        .finally(() => {
          completedPromises++;
          if (completedPromises === promise.length) resolve(result);
        });
    }
  });
};

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(resolve).catch(reject);
    }
  });
};

MyPromise.any = function (promises) {
  const error = [];
  let rejectedPromises = 0;
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise.then(resolve).catch((err) => {
        error[i] = err;
        rejectedPromises++;
        if (rejectedPromises === promise.length) {
          reject(new AggregateError(error, "All promises were rejected"));
        }
      });
    }
  });
};
