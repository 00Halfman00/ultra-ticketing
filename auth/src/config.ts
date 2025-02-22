import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
  throw new Error('Missing required environment variable: PORT');
}
if (!process.env.DATABASE_URL) {
  throw new Error('Missing required environment variable: DATABASE_URL');
}
if (!process.env.JWT_KEY) {
  throw new Error('Missing required environment variable: JWT_KEY');
}
if (!process.env.COOKIE_KEY1) {
  throw new Error('Missing required environment variable: COOKIE_KEY1');
}
if (!process.env.COOKIE_SIGNED) {
  throw new Error('Missing required environment variable: COOKIE_SIGNED');
}
if (!process.env.COOKIE_SECURE) {
  throw new Error('Missing required environment variable: COOKIE_SECURE');
}

interface Config {
  port: number;
  db: string;
  jwt_key: string;
  cookie_settings: {
    keys: string[];
    signed: boolean;
    secure: boolean;
  };
  // Add other configuration properties here
}

const config: Config = {
  port: +process.env.PORT,
  db: process.env.DATABASE_URL,
  jwt_key: process.env.JWT_KEY,
  cookie_settings: {
    keys: [process.env.COOKIE_KEY1],
    signed: !!process.env.COOKIE_SIGNED,
    secure: !!process.env.COOKIE_SECURE,
  },
  // Add other configuration properties here
};

export default config;
