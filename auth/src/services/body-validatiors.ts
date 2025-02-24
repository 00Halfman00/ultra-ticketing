import { body } from 'express-validator';
import { passwordSize } from '../config';

export const bodySigninValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .isLength(passwordSize)
    .withMessage('Password must be from 4 and 20 characters.')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password'),
];

export const bodySignupValidator = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength(passwordSize)
    .withMessage('Password must be from 4 to 20 characters'),
];
