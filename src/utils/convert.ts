export const convert =
  (fn: Function) =>
  (...args: any) => {
    return new Promise((resolve, reject) =>
      fn(...args, (...a: any) => {
        if (a[0]) reject(a[0]);
        resolve(a[1]);
      })
    );
  };
