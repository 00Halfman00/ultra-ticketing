import * as dotenv from 'dotenv';
dotenv.config();

if (!process.env.PORT) {
  throw new Error('Missing required environment variable: PORT');
}
if (!process.env.DATABASE_URL) {
  throw new Error('Missing required environment variable: DATABASE_URL');
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
if (!process.env.TERM) {
  throw new Error('Missing required environment variable: TERM');
}
if (!process.env.TERM_STATUS) {
  throw new Error('Missing required environment variable: TERM_STATUS');
}

export const jwt_key = process.env.JWT_KEY!;

interface Config {
  port: number;
  db: string;
  term: string;
  term_status: boolean;
  cookie_settings: {
    keys: string[];
    signed: boolean;
    secure: boolean;
  };
}

export const config: Config = {
  port: +process.env.PORT,
  db: process.env.DATABASE_URL,
  term: process.env.TERM,
  term_status: !!process.env.TERM_STATUS,
  cookie_settings: {
    keys: [process.env.COOKIE_KEY1],
    signed: !!process.env.COOKIE_SIGNED,
    secure: !!(process.env.NODE_ENV != process.env.COOKIE_SECURE),
  },
};

interface PasswordSize {
  min: number;
  max: number;
}

export const passwordSize: PasswordSize = {
  min: 8,
  max: 24,
};
