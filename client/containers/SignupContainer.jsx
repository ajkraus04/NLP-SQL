import React from 'react';
import Menu from '../components/Menu.jsx';
import Login from '../components/login.jsx';

const SignupContainer = () => {
  // add pertinent state here

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900">
      <Menu login={false} />
      <Login signup={true} />
    </div>
  );
};

export default SignupContainer;
