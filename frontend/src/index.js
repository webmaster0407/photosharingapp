import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './index.css';

import Home from './pages/Home';
import Profile from './pages/User';
import Navbar from './layouts/Navbar';
import Photo from './pages/Photo';
import Upload from './pages/Upload';
import Edit from './pages/Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/?category=:id' element={<Home />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route exact path='/photo/:id' element={<Photo />} />
          <Route exact path='/upload' element={<Upload />} />
          <Route exact path='/edit' element={<Edit />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
