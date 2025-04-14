export const StatusCodes = {
  OK_200: 200,
  CREATED_201: 201,
  ACCEPTED_202: 202, // Request accepted but not yet processed
  NO_CONTENT_204: 204, // Successful request with no content returned
  BAD_REQUEST_400: 400,
  UNAUTHORIZED_401: 401,
  FORBIDDEN_403: 403,
  NOT_FOUND_404: 404,
  METHOD_NOT_ALLOWED_405: 405, // HTTP method not allowed for the endpoint
  CONFLICT_409: 409,
  GONE_410: 410, // Resource no longer available
  UNPROCESSABLE_ENTITY_422: 422, // Validation error, typically used for invalid data
  INTERNAL_SERVER_ERROR_500: 500,
  NOT_IMPLEMENTED_501: 501, // Server does not support the functionality required
  BAD_GATEWAY_502: 502, // Proxy server error
  SERVICE_UNAVAILABLE_503: 503, // Service is unavailable, often for maintenance
  GATEWAY_TIMEOUT_504: 504, // Timeout from upstream server
};
