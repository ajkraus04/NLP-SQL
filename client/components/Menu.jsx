import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="text-white w-screen h-16 flex justify-between items-center gap-2 border ">
      <h1>Information AI</h1>
      <div class="flex text-white justify-around gap-2 ">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">login</Link>
      </div>
    </div>
  );
};

export default Menu;
