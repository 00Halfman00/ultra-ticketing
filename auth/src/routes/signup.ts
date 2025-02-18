import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-errors';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be from 4 to 20 characters'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log('Validation result errors Array: ', errors);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    if (req.body.email.split('@')[0] === 'one') {
      throw new DatabaseConnectionError();
    } else {
      res.send(req.body);
    }
  }
);

export { router as singupRouter };
