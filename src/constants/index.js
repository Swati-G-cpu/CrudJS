const HTTP = {
  SUCCESS: {
    code: 200,
    message: "Success",
  },
  BAD_REQUEST: {
    code: 400,
    message:
      "Bad Request -- The request could not be understood by the server due to malformed syntax",
  },
  AUTH_ERROR: {
    code: 401,
    message: "Unauthorized -- The request requires user authentication",
  },
  FORBIDDEN: {
    code: 403,
    message:
      "Forbidden -- The server understood the request, but is refusing to fulfill it.",
  },
  NOT_FOUND: {
    code: 404,
    message:
      "Not Found -- The server has not found anything matching the Request-URI.",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message:
      "Internal Server Error -- We had a problem with our server. Try again later.",
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message:
      "Method Not Allowed -- The method specified in the Request-Line is not allowed for the resource identified by the Request-URI.",
  },
  DUPLICATE_TRANSACTION: {
    code: 409,
    message:
      "Duplicate Transaction -- Transaction with the given number is already in process.",
  },
  TOO_MANY_REQUEST: {
    code: 429,
    message: "Too Many Requests -- Request counts exceed our limit. Slow down!",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: `Service Unavailable -- We're temporarially offline for maintanance. Please try again later.`,
  },
  PARTIAL_SUCCESS: {
    code: 207,
    message: `Partial Success -- The request processed successfully, but there were some partial successes or failures.`,
  },
};

const defaultServerResponse = {
  status: 400,
  message: "",
  body: {},
};

const requestValidationMessage = {
  BAD_REQUEST: "Invalid input data",
  TOKEN_MISSING: "Token missing from header",
  ACCESS_DENIED:
    "You do not have the privileges to perform the requested operation",
  INVALID_API_KEY: "Invalid api key",
};

const movie = {
  messages: {
    MOVIE_CREATED: "Movie created successfully",
    MOVIE_UPDATED: "Movie updated successfully",
    MOVIE_FETCHED: "Movie fetched successfully",
    MOVIE_DELETED: "Movie deleted successfully",
    MOVIE_LIST_FETCHED: "Movie list fetched successfully",
    MOVIE_NOT_FOUND: "Movie not found",
    MOVIE_LIST_NOT_FOUND: "Movies list not found",
    MOVIE_ALREADY_EXISTS: "Movie already exists",
  },
};

export { movie, HTTP, defaultServerResponse, requestValidationMessage };
