import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// so that this function is available in any test file
declare global {
  var signup: () => Promise<string[]>;
}

global.signup = async () => {
  const currentUser = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  const cookie = currentUser.get('Set-Cookie');
  if (!cookie) {
    throw new Error('No Set-Cookie header found');
  }
  return cookie;
};
