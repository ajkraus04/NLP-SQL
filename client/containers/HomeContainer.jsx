import React, { useEffect } from 'react';
import Menu from '../components/Menu.jsx';
import { useState } from 'react';
import saveQuery from '../actions.js';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const HomeContainer = () => {
  // add pertinent state here
  const [uri, setUri] = useState('');
  const [submitUri, setSubmitUri] = useState(false);
  const [queries, setQueries] = useState([]);
  const [currQuery, setCurrQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userLoggedIn = async () => {
      const data = await fetch('/api/isLoggedIn', {
        method: 'GET',
      });

      const ans = await data.json();
      console.log(ans);
      if (ans === 'false') {
        console.log('false');
        navigate('/');
      }
    };
    userLoggedIn();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setUri(e.target.value);
  };

  const handleChangeQuery = (e) => {
    setCurrQuery(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    submitUri === true ? setSubmitUri(false) : setSubmitUri(true);
  };

  const submitQuery = async (e) => {
    e.preventDefault();

    const start = document.createElement('p');
    start.textContent = 'Input: ' + currQuery;

    document.querySelector('#query').value = '';

    start.className = 'text-sm text-left font-mono';

    document.querySelector('#queryData').appendChild(start);
    const data = {
      query: currQuery,
      uri,
    };

    const p = document.createElement('div');

    p.className = 'text-sm text-left text-green-500 font-mono';
    p.innerHTML = `<div>
    <style>
  
  .loader-dots div {
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .loader-dots div:nth-child(1) {
      left: 8px;
      animation: loader-dots1 0.6s infinite;
  }
  .loader-dots div:nth-child(2) {
      left: 8px;
      animation: loader-dots2 0.6s infinite;
  }
  .loader-dots div:nth-child(3) {
      left: 32px;
      animation: loader-dots2 0.6s infinite;
  }
  .loader-dots div:nth-child(4) {
      left: 56px;
      animation: loader-dots3 0.6s infinite;
  }
  @keyframes loader-dots1 {
      0% {
          transform: scale(0);
      }
      100% {
          transform: scale(1);
      }
  }
  @keyframes loader-dots3 {
      0% {
          transform: scale(1);
      }
      100% {
          transform: scale(0);
      }
  }
  @keyframes loader-dots2 {
      0% {
          transform: translate(0, 0);
      }
      100% {
          transform: translate(24px, 0);
      }
  }
  </style>
  
  <div class="fixed gap-2 z-50  flex items-center justify-center " >
      <p>AI: Thinking  </p>
      <div class="loader-dots block relative w-20 h-5 mt-2">
        <div class="absolute top-0 mt-1 w-2 h-2  rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-2 h-2 rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-2 h-2 rounded-full bg-green-500"></div>
        <div class="absolute top-0 mt-1 w-2 h-2 rounded-full bg-green-500"></div>
      </div>
    </div>
  </div>`;

    document.querySelector('#queryData').appendChild(p);

    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const ans = await response.json();
    console.log(ans);
    p.innerHTML = '';
    p.textContent = 'Ans: ' + ans;

    saveQuery({ query: currQuery, response: ans });
  };

  const deleteAcct = async (e) => {
    const deleted = await fetch('/api/deleteAcct', {
      method: 'DELETE',
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900">
      <Menu login={true} />
      <div className="flex w-screen ">
        <div className="grid w-1/2 h-96 border-white rounded-md border-8 mt-10 ml-10 text-white font-mono shadow-md mb-0">
          <h2 className="mx-auto mt-5 h-10 text-3xl font-bold">
            Chat with your DB
          </h2>
          <div id="queryData" className="self-start ml-5 ">
            {/* This is where the query responses get appended too. */}
          </div>
          <form id="forms" className="self-end mx-auto">
            <label className="p-2 text-lg font-mono">Query: </label>
            <input
              className="border w-96 p-2 font-mono text-black"
              type="text"
              id="query"
              name="query"
              onChange={(e) => handleChangeQuery(e)}
            />
            <button
              className="bg-slate-800  hover:bg-slate-900 text-white border mt-2 mx-2 p-2 shadow-lg"
              type="Enter"
              value="Enter"
              onClick={(e) => submitQuery(e)}
            >
              Enter
            </button>
          </form>
        </div>
        <div className="grid w-1/2 h-96 border-white mt-10 mr-10 ml-5 text-white border-8 rounded-md font-mono shadow-md">
          <h2 className=" mx-auto mt-5 text-3xl font-bold">Settings</h2>
          <div className="ml-10">
            <p className="font-black">Database URI</p>
            {submitUri === false ? (
              <>
                <input
                  className="border text-black"
                  type="text"
                  id="URI"
                  name="URI"
                  onChange={(e) => handleChange(e)}
                />

                <button
                  className=" bg-green-500 hover:bg-green-600 text-white p-2 font-mono border ml-2 shadow-lg"
                  onClick={(e) => handleClick(e)}
                >
                  Add
                </button>
              </>
            ) : (
              <>
                <p className="text-white font-mono text-sm">{uri}</p>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white p-2 border ml-2 shadow-lg"
                  onClick={(e) => handleClick(e)}
                >
                  Delete
                </button>
              </>
            )}
            <div className="bg-red-500 hover:bg-red-600 w-24 mt-20">
              <button onClick={(e) => deleteAcct(e)}>
                <Link to="/">Deactivate Account</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContainer;
