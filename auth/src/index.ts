import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { singupRouter } from './routes/signup';
import { singinRouter } from './routes/singin';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

const PORT = 3000;
const app = express();

app.use(express.json());
console.log('ticketing');
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(singupRouter);
app.use(singinRouter);
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth Server listening on port: ${PORT}`);
});
