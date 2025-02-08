import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css';
import DropBox from '../components/DropBox';
import Navbar from '../shared/Navbar';

function App() {
  

  return (
    <>
    <Navbar />
    <DropBox />
    </>
  );
}

export default App;
