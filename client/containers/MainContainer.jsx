import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import Login from '../components/login.jsx';

const MainContainer = () => {
  // add pertinent state here

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900">
      <Menu login={false} />
      <Login signup={false} />
    </div>
  );
};

export default MainContainer;
