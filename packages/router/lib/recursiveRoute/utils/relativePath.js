export default function relativePath(rootPath = '', path = '') {
  return (rootPath + path).split('//').join('/')
}
