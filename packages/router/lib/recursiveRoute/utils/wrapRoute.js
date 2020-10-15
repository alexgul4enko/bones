export default function wrapRoute(route, ...args) {
  return function(component) {
    return Array.from(args)
      .filter(Boolean)
      .reduce((res, Wrapper) => {
        return (
          <Wrapper {...route}>{res}</Wrapper>
        )
      }, component)
  }
}
