export default function routesMap(routes, basePath = '/') {
  return routes.reduce((acc, { name, path, routes }) => {
    if (!path) {
      return acc;
    }

    path = makePath(path, basePath);

    if (name) {
      acc = {
        ...acc,
        [name]: path
      };
    }

    if (routes) {
      acc = {
        ...acc,
        ...routesMap(routes, path)
      };
    }
    return acc;
  }, {});
}

function makePath(path, basePath) {
  return (basePath + path).replace(/\/+/g, '/');
}
