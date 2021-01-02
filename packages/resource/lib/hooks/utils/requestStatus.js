export default function requestStatus() {
  var request
  var pending = false
  this.setRequest = function(func) {
    pending = true
    request = func
    if(func) {
      func.finally(() => pending = false)
    }
  }
  this.isPending = function() {
    return pending
  }
  this.cancel = function() {
    if(request && request.cancel && typeof request.cancel === 'function') {
      request.cancel()
    }
  }
}
