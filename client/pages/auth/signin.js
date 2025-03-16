import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks.js/use-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, doRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    doRequest();
  };
  return (
    <div className="container-md">
      <h2>Sign In</h2>
      {errors}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label">email</label>
          <input
            className="form-control"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '.5rem' }}>
          <button className="btn btn-primary" type="submit">
            sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
