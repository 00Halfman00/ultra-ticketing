import { config } from './config';
import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { singupRouter } from './routes/signup';
import { singinRouter } from './routes/singin';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

export const app = express();

app.set('trust proxy', true); // to allow traffic coming from proxy: ingress nginx
app.use(express.json()); // middleware is responsible for parsing the body of incoming requests that have a Content-Type header of application/json
app.use(cookieSession(config.cookie_settings));
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(singupRouter);
app.use(singinRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
