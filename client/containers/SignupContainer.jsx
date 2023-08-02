import React from 'react';
import Menu from '../components/Menu.jsx';
import Login from '../components/login.jsx';

const SignupContainer = () => {
  // add pertinent state here

  return (
    <div className="bg-slate-800">
      <Menu login={false} />
      <Login signup={true} />
    </div>
  );
};

export default SignupContainer;
