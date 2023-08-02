import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const { login } = props;
  return (
    <div className="text-white font-mono w-screen h-16 flex justify-between items-center gap-2 shadow-2xl ">
      <h1>Information AI</h1>
      <div className="flex text-white justify-around gap-2 ">
        {login === false ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">login</Link>
          </>
        ) : (
          <Link to="/login">Log Out</Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
