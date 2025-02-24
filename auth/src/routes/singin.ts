import express, { Request, Response } from 'express';
import { bodySigninValidator } from '../services/body-validatiors';
import { RequestValidation } from '../middlewares/request-validation';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-errors';
import { PasswordHandler } from '../services/password-handler';
import jwt from 'jsonwebtoken';
import { jwt_key } from '../config';

const router = express.Router();

router.post(
  '/api/users/signin',
  bodySigninValidator,
  RequestValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    if (await PasswordHandler.verify(password, existingUser.password)) {
      const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
        },
        jwt_key
      );
      req.session = {
        jwt: userJwt,
      };
      res.send(req.body);
    } else {
      console.log('wrong password');
      throw new BadRequestError('Invalid credentials');
    }
  }
);

export { router as singinRouter };
