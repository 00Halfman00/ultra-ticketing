import React, { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks.js/form-request';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, doRequest } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    doRequest();

    try {
      await doRequest();
      setEmail('');
      setPassword('');
      Router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-md">
      <h2>Singup</h2>
      {errors}
      {null && (
        <p className="alert alert-success" role="alert">
          Signup was successful
        </p>
      )}
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
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
