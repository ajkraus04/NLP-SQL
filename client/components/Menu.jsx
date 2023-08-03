import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
  const { login } = props;
  return (
    <div className=" text-white font-mono w-screen h-16 flex justify-between items-center gap-2 shadow-xl ">
      <h1 className="ml-10 text-lg">Information AI</h1>
      <div className="flex text-white text-lg justify-around gap-2 ">
        {login === false ? (
          <>
            <Link className="hover:underline" to="/signup">
              Sign Up
            </Link>
            <Link className="mr-10 hover:underline" to="/login">
              login
            </Link>
          </>
        ) : (
          <Link className="mr-10 hover:underline" to="/login">
            Log Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
