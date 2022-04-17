class HttpError extends Error {
   constructor(message, errorCode) {
      super(message); // Creating a "message" prop
      this.code = errorCode;
   }
}

module.exports = HttpError;
