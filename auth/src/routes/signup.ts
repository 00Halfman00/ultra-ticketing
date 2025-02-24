import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_key } from '../config';
import { bodySignupValidator } from '../services/body-validatiors';
import { RequestValidation } from '../middlewares/request-validation';
import { BadRequestError } from '../errors/bad-request-errors';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  bodySignupValidator,
  RequestValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const tmp = new BadRequestError('User with that email already exist.');
      throw tmp;
    } else {
      const newUser = User.build({ email, password });
      await newUser.save();
      const userJwt = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
        },
        jwt_key
      );
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send(newUser);
    }
  }
);

export { router as singupRouter };
