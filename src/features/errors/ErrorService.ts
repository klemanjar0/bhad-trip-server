import { ERROR, ErrorCodes } from './ErrorCodes';
import { HTTPError } from '../entities/HTTPError';

class ErrorService {
  errors: Record<number, string>;

  constructor(errors) {
    this.errors = errors;
  }

  getErrorMap() {
    return this.errors;
  }

  getDescription(errorCode: number): string {
    return this.errors[errorCode];
  }

  getError(errorCode): HTTPError {
    return {
      message: this.errors[errorCode] || this.errors[ERROR.UNKNOWN],
    };
  }
}

export default new ErrorService(ErrorCodes);
