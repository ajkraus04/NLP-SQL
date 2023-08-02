import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import Login from '../components/login.jsx';

const MainContainer = () => {
  // add pertinent state here

  return (
    <div className="bg-slate-800">
      <Menu />
      <Login signup={false} />
    </div>
  );
};

export default MainContainer;
