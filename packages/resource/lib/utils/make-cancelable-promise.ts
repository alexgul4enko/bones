import { CancelablePromise } from '../types';

export function makeCancelablePromise(promise: Promise<any>, ...args: AbortController[]): CancelablePromise {
  function cancel() {
    if (!Array.isArray(args)) {
      return;
    }
    args.forEach((controller) => controller.abort());
  }
  (promise as CancelablePromise).cancel = cancel;
  return promise as CancelablePromise;
}
