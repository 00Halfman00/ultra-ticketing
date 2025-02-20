import mongoose from 'mongoose';

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
const userSchema = new mongoose.Schema<UserDoc>({
  // type the schema
  email: {
    type: String,
    required: true,
    unique: true, // add unique constraint for emails
  },
  password: {
    type: String,
    require: true,
  },
});
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
  I won't get a console.log in this file unless I call it from somewhere else,
  like when the app starts up; I just call this file from there.
*/

/*
  Generics <> in typescript are used to describe the types being used inside of a
  function, class or an instance
*/
