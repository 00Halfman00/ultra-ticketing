import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  cookieKey: string;
  db: string;
  // Add other configuration properties here
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  cookieKey: process.env.COOKIE_KEY || 'devCookieKey',
  db: process.env.DATABASE_URL || 'db',
  // Add other configuration properties here
};

export default config;
