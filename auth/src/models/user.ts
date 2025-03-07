import mongoose from 'mongoose';
import { PasswordHandler } from '../services/password-handler';

/*  INTERFACE 1: UserAttrs
Interface that describes the properties required to create an instance of a new user
*/
interface UserAttrs {
  email: string;
  password: string;
}

/*  INTERFACE 2: UserModel
Interface that describes the properties required for a UserModel, since it is going
to have custom methods that are being created here.
(Interface for what the collection of all users will look like)
*/
// INTERFACE 1 AND 3 BEING APPLIED
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
/*  INTERFACE 3: UserDoc
Interface that describes the properties for a user Document.
(Interface for what an instance of a single user will look like)
*/
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// INTERFACE 3 BEING APPLIED
const userSchema = new mongoose.Schema<UserDoc>(
  {
    // type the schema
    email: {
      type: String,
      required: true,
      unique: true, // add unique constraint for emails
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre(
  'save',
  async function (this: UserDoc, done: (err?: Error) => void) {
    if (this.isModified('password')) {
      try {
        const hashed = await PasswordHandler.toHash(this.get('password'));
        this.set('password', hashed);
        done();
      } catch (err) {
        console.error(err);
        done(err as Error); // Pass the error to the next middleware or error handler // Type assertion
      }
    }
    done();
  }
);

/*
To do effective type checking when using TypeScript with Mongoose and creating a document,
a function will be used to engineer proper type checking,
so a build method will be integrated into UserModel.
*/
// INTERFACE 1 BEING APPLIED
userSchema.statics.build = (attrs: UserAttrs): UserDoc => {
  return new User(attrs);
};
// INTERFACES 2 AND 3 APPLIED
const User = mongoose.model<UserDoc, UserModel>('User', userSchema, 'users');

export { User };

/*
  Generics <> in typescript are used to describe the types being used inside of a
  function, class or an instance
*/
