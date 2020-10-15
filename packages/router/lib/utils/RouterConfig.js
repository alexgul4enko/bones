export default function RouterConfig() {
  var interceptors = []
  this.addInterceptor = function(interceptor) {
    if(typeof interceptor !== 'function') {
      throw new Error('Interceptor should be a function')
    }
    const testExamle = interceptor({ children: 'test' })
    if(get(testExamle, 'props.children') !== 'test' && testExamle !== 'test') {
      throw new Error('Interceptor should always return children')
    }
    interceptors.push(interceptor)
  }
  this.getInterceptors = function() {
    return interceptors
  }
}
