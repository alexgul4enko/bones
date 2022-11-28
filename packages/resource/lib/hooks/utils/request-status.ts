import { CancelablePromise } from '../../types';
import get from 'lodash/get';

interface RequestStatusType {
  isPending: () => boolean;
  setRequest: (func: CancelablePromise) => void;
  cancel: () => void;
}

export const RequestStatus = function (this: RequestStatusType) {
  let request: CancelablePromise;
  let pending = false;
  this.setRequest = function (func: CancelablePromise) {
    pending = true;
    request = func;
    // eslint-disable-next-line
        if (func && func.finally && typeof func.finally === 'function') {
      func.finally(() => {
        pending = false;
      });
    }
  };
  this.isPending = function () {
    return pending;
  };
  this.cancel = function () {
    if (typeof get(request, 'cancel') === 'function') {
      get(request, 'cancel')();
    }
  };
} as unknown as new () => RequestStatusType;
