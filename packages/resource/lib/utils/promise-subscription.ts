import merge from 'lodash/merge';

export type CancelablePromise = Promise<boolean> & { cancel: () => void };

/*
 * functoin to make Promise subscription
 * common ussage is to do not change state after React component unmounts.
 * Like componentWillUnmount this.subscription.cancel()
 */
export function makePromiseSubscription(subscriptions: Promise<unknown> | Promise<unknown>[]): CancelablePromise {
  let isCanceled = false;
  const wrappedPromise = Promise.all(([] as Promise<unknown>[]).concat(subscriptions)).then(() => {
    if (isCanceled) {
      throw new Error('Promise canceled');
    }
    return isCanceled;
  });
  return merge(wrappedPromise, {
    cancel: () => {
      isCanceled = true;
    }
  });
}
