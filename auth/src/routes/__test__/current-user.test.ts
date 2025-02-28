import request from 'supertest';
import { app } from '../../app';

it('it returns a 201 on a signup, and confirms it is the currentuser', async () => {
  const cookie = await signup();
  if (!cookie) {
    throw new Error('No Set-Cookie header found');
  }

  const currentUserResponse = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(currentUserResponse.body.currentUser).toBeDefined();
  expect(currentUserResponse.body.currentUser.email).toEqual('one@one.com');
});

it('returns a 200 and confirms the response body is null', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
