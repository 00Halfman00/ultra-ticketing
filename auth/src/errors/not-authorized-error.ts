import { CustomError } from './custom-errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized Error');

    Object.setPrototypeOf(this, NotAuthorizedError);
  }

  serializeErrors() {
    return [{ message: 'Not Authorized Error' }];
  }
}
