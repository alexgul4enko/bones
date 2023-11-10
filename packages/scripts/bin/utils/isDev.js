function isDev() {
  return process.env.NODE_ENV !== 'production';
}

module.exports = isDev;
