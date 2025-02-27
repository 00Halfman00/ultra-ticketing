import request from 'supertest';
import { app } from '../../app';

it('returns 201 on a successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);
});

it('returns 201 on a successful signup and 400 on a signup with existing email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(400);
});

it('returns 201 on a successful signup and sets cookie', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);
  expect(response.get('Set-Cookie'));
});
