import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setMessage('');

      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      setMessage('Upload successful!');
    } catch (err) {
      setMessage('Upload failed.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>File Upload with Progress</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadProgress > 0 && (
        <div style={{ marginTop: 10 }}>
          <progress value={uploadProgress} max="100" style={{ width: '100%' }} />
          <div>{uploadProgress}%</div>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
