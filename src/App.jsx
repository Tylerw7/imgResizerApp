import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ImageResize from '../pages/ImageResize';
import Login from '../pages/Login';


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resizer" element={<ImageResize />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
