export function promiseDebounce(debounced: (...args: any[]) => any, interval = 300) {
  if (typeof debounced !== 'function') {
    throw new Error('debounced should be a function');
  }
  if (typeof interval !== 'number') {
    throw new Error('interval should be a number');
  }
  let clock: any;
  return function (...args: any[]) {
    if (clock) {
      clearTimeout(clock);
      clock = undefined;
    }
    return new Promise(function (resolve) {
      clock = setTimeout(function () {
        clock = undefined;
        resolve(debounced(...args));
      }, interval);
    });
  };
}
