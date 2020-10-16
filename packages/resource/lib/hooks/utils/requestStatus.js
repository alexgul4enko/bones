export default function requestStatus() {
  var request
  this.setRequest = function(func) {
    request = func
  }
  this.cancel = function() {
    if(request && request.cancel && typeof request.cancel === 'function') {
      request.cancel()
    }
  }
}
