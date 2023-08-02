import React, { useEffect } from 'react';
import Menu from '../components/Menu.jsx';
import { useState } from 'react';
import saveQuery from '../actions.js';
import { Link, redirect, useNavigate } from 'react-router-dom';

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
    const response = await fetch('/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const ans = await response.json();
    console.log(ans);

    const p = document.createElement('p');
    p.textContent = 'Ans: ' + ans;
    p.className = 'text-sm text-left text-green-700 font-mono';

    document.querySelector('#queryData').appendChild(p);

    saveQuery({ query: currQuery, response: ans });
  };

  const deleteAcct = async (e) => {
    const deleted = await fetch('/api/deleteAcct', {
      method: 'DELETE',
    });
  };

  return (
    <div className="bg-slate-800">
      <Menu login={true} />
      <div className="flex w-screen ">
        <div className="grid w-1/2 h-96 border rounded-md border-8 mt-10 ml-10 text-white font-mono shadow-md mb-0">
          <h2 className="mx-auto mt-5 h-10 text-3xl font-bold">
            Chat with your DB
          </h2>
          <div id="queryData" className="self-start ml-5 ">
            {/* This is where the query responses get appended too. */}
          </div>
          <form id="forms" className="self-end mx-auto">
            <label className="p-2 font-mono">Query: </label>
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
        <div className="grid w-1/2 h-96 border mt-10 mr-10 ml-5 text-white border-8 rounded-md font-mono shadow-md">
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
            <div className="bg-red-500 hover:bg-red-600 w-32 mt-20">
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
