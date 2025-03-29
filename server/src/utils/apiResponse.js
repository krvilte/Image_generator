class ApiResponse {
  constructor(statusCode, message = "Success", data = {}) {
    this.message = message;
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export default ApiResponse;
