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

app.set(config.term, config.term_status);
app.use(express.json());
app.use(cookieSession(config.cookie_settings));
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(singupRouter);
app.use(singinRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);
