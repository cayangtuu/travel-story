function CustomError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}
CustomError.prototype = Object.create(Error.prototype)

class AssertError extends Error {
  constructor(message) {
    super(message)
    this.name = 'AssertError'
    this.status = 500
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = { CustomError, AssertError }