import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import SignupContainer from './containers/SignupContainer.jsx';
import HomeContainer from './containers/HomeContainer.jsx';

const App = () => {
  return (
    <div className="bg-white flex h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={MainContainer} />
          <Route path="/signup" Component={SignupContainer} />
          <Route path="/login" Component={MainContainer} />
          <Route path="/home" Component={HomeContainer} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
