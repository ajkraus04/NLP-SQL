import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  const { signup } = props;
  return (
    <div className="rounded-md text-lg bg-slate-100 text-black font-mono flex h-1/2 mx-auto mt-28 w-1/3 flex items-center justify-center shadow-sm shadow-slate-500  	">
      <form
        className="mx-auto"
        method={'POST'}
        action={signup ? '/api/signup' : '/api/login'}
      >
        <label>Username: </label>
        <input
          className="border text-black mb-2"
          type="text"
          id="username"
          name="username"
        />
        <br></br>
        <label>Password: </label>
        <input
          className="border text-black"
          type="password"
          id="password"
          name="password"
        />
        <br></br>
        <input
          className="bg-slate-800 text-white border p-2 shadow-lg hover:bg-slate-900"
          type="submit"
          value={signup ? 'Sign Up' : 'Login'}
        ></input>
      </form>
    </div>
  );
};

export default Login;
