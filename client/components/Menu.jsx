import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const { login } = props;
  return (
    <div className=" text-white font-mono w-screen h-16 flex justify-between items-center gap-2 shadow-xl ">
      <h1 className="ml-10">Information AI</h1>
      <div className="flex text-white justify-around gap-2 ">
        {login === false ? (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link className="mr-10" to="/login">
              login
            </Link>
          </>
        ) : (
          <Link className="mr-10" to="/login">
            Log Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
