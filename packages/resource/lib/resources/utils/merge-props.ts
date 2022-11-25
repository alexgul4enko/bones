/*
 * redux connect merge function
 */
export function mergeProps(
  stateProps: Record<string, any>,
  dispatchProps: Record<string, any>,
  ownProps: Record<string, any>
) {
  const mergeProps = Object.entries(stateProps).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        ...value,
        ...dispatchProps[key]
      }
    };
  }, {});
  return { ...ownProps, ...mergeProps };
}
