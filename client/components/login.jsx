import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const { signup } = props;
  return (
    <div className=" text-white flex justify-center items-center  w-screen rounded overflow-hidden shadow-lg">
      <form method={'POST'} action={signup ? '/api/signup' : '/api/login'}>
        <label>Username: </label>
        <input className="border" type="text" id="username" name="username" />
        <br></br>
        <label>Password: </label>
        <input className="border" type="text" id="password" name="password" />
        <br></br>
        <input
          className="border"
          type="submit"
          value={signup ? 'Sign Up' : 'Login'}
        ></input>
      </form>
    </div>
  );
};

export default Login;
