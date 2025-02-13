import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './DropBox.css';
import { Box, Button, TextField, IconButton } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';

const DropBox = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [selectedImage, setSelectedImage] = useState(null);
    const [downloadLinks, setDownloadLinks] = useState([]);
    const [sizes, setSizes] = useState([{ width: '', height: '' }]);

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            setSelectedImage(acceptedFiles[0]);
        }
    }, [acceptedFiles]);

    const handleResizeAndDownload = async () => {
        if (!selectedImage) return alert("Please select an image!");
        if (sizes.some(size => !size.width || !size.height)) return alert("Please enter valid width and height for all sizes.");

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('sizes', JSON.stringify(sizes));

        try {
            const response = await axios.post('http://localhost:5001/resize', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setDownloadLinks([response.data.zipDownloadLink]);
        } catch (error) {
            console.error('Error resizing image:', error);
        }
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const addSize = () => {
        if (sizes.length < 10) {
            setSizes([...sizes, { width: '', height: '' }]);
        } else {
            alert("You can add up to 10 sizes.");
        }
    };

    const removeSize = (index) => {
        setSizes(sizes.filter((_, i) => i !== index));
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
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected Preview" className="image" />
                    <ul>
                        <li>{selectedImage.name} - {(selectedImage.size / 1024).toFixed(2)} KB</li>
                    </ul>
                </div>
            )}

            {/* Dynamic Size Inputs */}
            <div className="size-inputs">
                <h4>Set Image Sizes</h4>
                {sizes.map((size, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
                        <TextField
                            label="Width (px)"
                            type="number"
                            value={size.width}
                            onChange={(e) => handleSizeChange(index, 'width', e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Height (px)"
                            type="number"
                            value={size.height}
                            onChange={(e) => handleSizeChange(index, 'height', e.target.value)}
                            size="small"
                        />
                        {sizes.length > 1 && (
                            <IconButton onClick={() => removeSize(index)} color="error">
                                <RemoveCircle />
                            </IconButton>
                        )}
                    </Box>
                ))}
                {sizes.length < 10 && (
                    <Button onClick={addSize} startIcon={<AddCircle />} variant="outlined">
                        Add Size
                    </Button>
                )}
            </div>

            {/* Resize Button */}
            <Button onClick={handleResizeAndDownload} disabled={!selectedImage} variant="contained" color="primary">
                Resize & Download
            </Button>

            {/* Download Links */}
            {downloadLinks.length > 0 && (
                <div className="download-links">
                    <h4>Download Resized Images</h4>
                    {downloadLinks.map((link, index) => (
                        <Button key={index} variant="outlined" component="a" href={link} target="_blank" rel="noopener noreferrer">
                            Download ZIP
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropBox;
