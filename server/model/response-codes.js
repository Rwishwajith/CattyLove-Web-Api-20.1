//TODO: Add more error codes
module.exports = {
  //100 Series
  // These are temporary Responses

  continue: 100,
  switchingProtocols: 101,
  processing: 102,

  //200 Series
  // The client accepts the Request, being processed successfully at the server.

  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  imUsed: 226,

  //300 Series
  // Most of the codes related to this series are for URL Redirection.

  multipleChoices: 300,
  movedPermanently: 301,
  found: 302,
  seeOther: 303,
  notModified: 304,
  useProxy: 305,
  switchProxy: 306,
  temporaryRedirect: 307,
  permanentRedirect: 308,

  //400 Series
  // These are specific to client-side error.

  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodNotAllowed: 405,
  notAcceptable: 406,
  proxyAuthenticationRequired: 407,
  requestTimeout: 408,
  conflict: 409,
  gone: 410,
  lengthRequired: 411,
  preconditionFailed: 412,
  payloadTooLarge: 413,
  uriTooLong: 414,
  unsupportedMediaType: 415,
  rangeNotSatisfiable: 416,
  expectationFailed: 417,
  imATeapot: 418,
  misdirectedRequest: 421,
  unprocessableEntity: 422,
  locked: 423,
  failedDependency: 424,
  upgradeRequired: 426,
  preconditionRequired: 428,
  tooManyRequests: 429,
  requestHeaderFieldsTooLarge: 431,
  unavailableForLegalReasons: 451,

  //500 Series
  // These are specific to the server-side error.

  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
  httpVersionNotSupported: 505,
  variantAlsoNegotiates: 506,
  insufficientStorage: 507,
  loopDetected: 508,
  notExtended: 510,
  networkAuthenticationRequired: 511,

  //Custom
  invalidToken: 1000,
  invalidUser: 1001,
  invalidPassword: 1002,
  invalidEmail: 1003,
  invalidPhone: 1004,
  invalidName: 1005,
  invalidAddress: 1006,
  invalidCity: 1007,
  invalidState: 1008,
  invalidZip: 1009,
};
