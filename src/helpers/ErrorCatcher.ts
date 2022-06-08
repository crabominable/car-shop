import StatusCode from '../utils/StatusCode';

class ErrorCatcher {
  constructor(public _httpStatusCode: StatusCode, public message: string) {}
}

export default ErrorCatcher;