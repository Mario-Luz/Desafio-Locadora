import HttpStatus from "http-status";

const defaultResponse = (data, statusCode = HttpStatus.OK, count = 1) => ({
  data,
  count,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) =>
  defaultResponse(
    {
      erro: message,
    },
    statusCode
  );

export { defaultResponse, errorResponse };
