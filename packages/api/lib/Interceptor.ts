import isEmpty from 'lodash/isEmpty';

type ErrorHandler = (error: any) => any;

export class Interceptor<SuccessType> {
  onSuccess: (SuccessType | undefined)[];
  onError: (ErrorHandler | undefined)[];
  finalIterceptor?: (a: any) => any;
  constructor(finalIterceptor?: <T>(a: T) => T | Promise<T>) {
    this.finalIterceptor = finalIterceptor;
    this.onSuccess = [];
    this.onError = [];
  }

  use({ onSuccess, onError }: { onSuccess?: SuccessType; onError?: ErrorHandler }) {
    if (!!onSuccess && typeof onSuccess !== 'function') {
      throw new Error('success interceptor shoud be a functoin');
    }
    if (!!onError && typeof onError !== 'function') {
      throw new Error('error interceptor shoud be a functoin');
    }
    this.onSuccess = [...this.onSuccess, onSuccess].filter(Boolean);
    this.onError = [...this.onError, onError].filter(Boolean);
    return this.removeInterceptor(onSuccess, onError);
  }

  run(data: Record<string, any>) {
    return (
      Promise.resolve(compose(...this.onSuccess)({ ...data }))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then((data) => (this.finalIterceptor ? this.finalIterceptor(data) : data))
    );
  }

  err(data: Record<string, any>) {
    return (
      Promise.resolve(compose(...this.onError)({ ...data }))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .then((data) => (this.finalIterceptor ? this.finalIterceptor(data) : data))
    );
  }

  removeInterceptor(onSuccess?: SuccessType, onError?: ErrorHandler) {
    return () => {
      this.onSuccess = this.onSuccess.filter((item: SuccessType | undefined) => item !== onSuccess);
      this.onError = this.onError.filter((item: ErrorHandler | undefined) => item !== onError);
    };
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-return */
export function compose(...functions: any[]) {
  if (!Array.isArray(functions) || isEmpty(functions)) {
    return (arg: any) => arg;
  }
  if (functions.length === 1) {
    return functions[0];
  }
  return functions.reduce(
    (a, b) =>
      (...args: any) =>
        a(b(...args))
  );
}
/* eslint-enable @typescript-eslint/no-unsafe-return */
