import { ERROR, ErrorCodes, ErrorStatusCodes } from './ErrorCodes';
import { HTTPError } from '../entities/HTTPError';
import * as moment from 'moment';
import { ErrorHttpStatusCode } from '@nestjs/common/utils/http-error-by-code.util';

class ErrorService {
  errors: Record<ERROR, string>;
  errorStatusCodes: Record<ERROR, ErrorHttpStatusCode>;

  constructor(errors, errorStatusCodes) {
    this.errors = errors;
    this.errorStatusCodes = errorStatusCodes;
  }

  getErrorMap() {
    return this.errors;
  }

  getDescription(errorCode: number): string {
    return this.errors[errorCode];
  }

  getError(errorCode: ERROR): HTTPError {
    return {
      message: this.errors[errorCode] || this.errors[ERROR.UNKNOWN],
      statusCode: this.errorStatusCodes[errorCode],
      timestamp: moment().toISOString(),
    };
  }
}

export default new ErrorService(ErrorCodes, ErrorStatusCodes);
