import { CustomError } from './custom-errors';

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Route not found'; // this line is not used at all
  constructor() {
    super('Error route not found.');
    Object.setPrototypeOf(this, NotFoundError);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
