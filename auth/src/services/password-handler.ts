import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const keylen = 64, // theses two values may better be stored in K Secrets
  hex = 'hex';

// promisify bridges the gap between callback-style functions and Promise-based functions.
const scryptAsync = promisify(scrypt);

export class PasswordHandler {
  static async toHash(password: string) {
    try {
      const saltBuf = randomBytes(8).toString(hex); // vs code infers that this is of type: Buffer, same as below
      const passwordBuf = (await scryptAsync(
        password,
        saltBuf,
        keylen
      )) as Buffer; // explicitly typed as Buffer because the promisy throws off type inference in VSCode

      return `${passwordBuf.toString(hex)}.${saltBuf}`;
    } catch (err) {
      console.error(err);
      throw new Error('Password hashing failed.');
    }
  }

  static async verify(password: string, storedHash: string) {
    try {
      const [hashedPassword, salt] = storedHash.split('.');
      const buf = (await scryptAsync(password, salt, keylen)) as Buffer;
      return buf.toString(hex) === hashedPassword;
    } catch (err) {
      console.error('Password Verification error: ', err);
      return false;
    }
  }
}

// the static access modifier allows properties and methods of a class to
// be called without creating an instance of the class; that is, you can
// directly call the method or property on the class.
