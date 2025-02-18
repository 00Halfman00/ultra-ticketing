import { ValidationError } from 'express-validator';
import { CustomError } from './custom-errors';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Error in Validation Request');
    // when extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((e) => {
      if (e.type === 'field') {
        return { message: e.msg, field: e.path };
      }
      return { message: e.msg };
    });
  }
}
