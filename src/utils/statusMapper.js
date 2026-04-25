export const getStatusText = (status, errorMessage) => {
  if (typeof status !== "number") {
    return errorMessage || "Error";
  }

  const statusMap = {
    200: "OK",
    201: "Created",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
  };

  return statusMap[status] || "Unknown";
};
