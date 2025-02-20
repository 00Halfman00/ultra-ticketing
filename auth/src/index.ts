import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { singupRouter } from './routes/signup';
import { singinRouter } from './routes/singin';
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';

import { User } from './models/user';

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

const startServers = async () => {
  try {
    const db = await mongoose.connect(
      'mongodb://auth-mongo-clusterip-srv:27017/auth-db'
    );
  } catch (err) {
    console.error('Database connection error:', err);
    // Important: Exit the process if the database connection fails
    process.exit(1); // Or handle it differently, but don't continue without DB
  }
  app.listen(PORT, () => {
    console.log(`Auth Server listening on port: ${PORT}`);
  });
};

startServers();

/*
Exiting the process when the database connection fails is crucial for several reasons, primarily related to the integrity and reliability of your application:

1.  Preventing Application Errors:  Most applications, especially those that rely on persistent data (like web apps with databases), are designed with the assumption that the database is available.  If the database connection fails and your application continues to run, it will likely encounter a cascade of errors.  Trying to perform database operations without a connection will lead to exceptions, crashes, or unpredictable behavior.  Exiting gracefully prevents these downstream issues.

2.  Avoiding Data Corruption:  In some cases, if your application tries to operate without a database connection, it might inadvertently corrupt data or leave the application in an inconsistent state.  For example, if your application tries to save data to a non-existent database, it might not fail immediately, but the data could be lost or corrupted later when the connection is restored.  Exiting prevents this risk.

3.  Ensuring Application Integrity:  A core principle of application design is that critical dependencies should be available.  If a critical dependency like the database is unavailable, the application's integrity is compromised.  Continuing to run an application in a degraded state can lead to unexpected behavior and make it difficult to diagnose problems.  Exiting signals that the application cannot function correctly and should not be relied upon.

4.  Facilitating Recovery:  By exiting cleanly, you give the system a chance to recover.  For example, a process manager (like PM2, systemd, or Docker) can be configured to automatically restart your application after it exits.  This allows the application to attempt to reconnect to the database when it becomes available again.  If the application continued to run in a broken state, it might not be able to recover automatically.

5.  Simplifying Debugging:  If your application crashes due to database connection issues, debugging becomes more challenging.  You might have to sift through multiple error messages and logs to pinpoint the root cause.  Exiting immediately when the connection fails makes it clear that the database connection is the problem, simplifying the debugging process.

6.  Resource Management:  In some cases, a failed database connection might leave resources (like open sockets) in an inconsistent state.  Exiting the process ensures that these resources are cleaned up properly by the operating system.

7.  Operational Clarity:  Exiting on database connection failure makes it clear to operators and monitoring systems that the application is unavailable due to a database issue.  This allows them to take appropriate action, such as investigating the database server or restarting the application.

In summary, exiting the process on a database connection failure is a defensive programming practice that promotes application stability, prevents data corruption, simplifies debugging, and facilitates recovery.  It's a best practice to handle this scenario explicitly and prevent your application from running in an invalid state.
*/
