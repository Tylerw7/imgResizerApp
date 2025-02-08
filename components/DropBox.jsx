import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './DropBox.css'
import { Button } from '@mui/material';

const DropBox = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [selectedImage, setSelectedImage] = useState(null);
    const [downloadLinks, setDownloadLinks] = useState([]);
  
    useEffect(() => {
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
      }
    }, [acceptedFiles]);
  
    const handleResizeAndDownload = async () => {
        if (!selectedImage) return alert("Please select an image!");
      
        const formData = new FormData();
        formData.append('image', selectedImage);
      
        try {
          const response = await axios.post('http://localhost:5001/resize', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
      
          // Set the ZIP file download link
          setDownloadLinks([response.data.zipDownloadLink]);
        } catch (error) {
          console.error('Error resizing image:', error);
        }
      };
  
    return (
      <div className="container">
        {/* Drop Zone */}
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
  
        {/* File List */}
        {selectedImage && (
          <div className="file-list">
            <h4>Selected File</h4>
            <img 
                src={URL.createObjectURL(selectedImage)} 
                alt="Selected Preview" 
                className="image"
                />
            <ul>
              <li>
                {selectedImage.name} - {(selectedImage.size / 1024).toFixed(2)} KB
              </li>
            </ul>
          </div>
        )}
  
        {/* Resize Button */}
        <button 
          onClick={handleResizeAndDownload} 
          disabled={!selectedImage} 
          className="button"
        >
          Resize 
        </button>
  
        {/* Download Links */}
        {downloadLinks.length > 0 && (
          <div className="download-links">
            <h4>Download Resized Images</h4>
            {downloadLinks.map((link, index) => (
              <div key={index}>
                <Button
                  variant="outlined"
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

export default DropBox