import request from 'supertest';
import { app } from '../../app';

it('it returns a 201 on a signup, and a 200 on clearing cookie after signout', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);
  const cookie = response.get('Set-Cookie');
  if (!cookie) {
    throw new Error('Expected cookie but got undefined');
  }
  expect(cookie[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
