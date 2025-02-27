import request from 'supertest';
import { app } from '../../app';

it('returns 201 on a successful signup and returns 200 on a successful singin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(200);
});

it('returns 201 on a successful signup, 200 on a successful singin and sets cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(200);
  expect(response.get('Set-Cookie'));
});

it('returns 400 on a nonexisting email on a signin', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(400);
});

it('returns 201 on a successful signup and 400 on an invalid email signin ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'one.one.com',
      password: 'onetwothree',
    })
    .expect(400);
});

it('returns 201 on a successful signup and 400 on a unknown email signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two@one.com',
      password: 'onetwothree',
    })
    .expect(400);
});

it('returns 201 on a successful signup and 400 on a wrong password signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two@one.com',
      password: 'onethreetwo',
    })
    .expect(400);
});

it('returns 201 on a successful signup and 400 on a too-short password signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two@one.com',
      password: 'one',
    })
    .expect(400);
});

it('returns 201 on a successful signup and 400 on a too-long password signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'one@one.com',
      password: 'onetwothree',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'two@one.com',
      password: 'onetwothreefourfivesix',
    })
    .expect(400);
});
