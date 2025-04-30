import React ,{ useState }from "react";
import axios from 'axios' 

const UploadPage: React.FC = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('http://127.0.0.1:8000/learn', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setMessage("Model trained successfully!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Upload CSV to Train Model</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );

};

export default UploadPage;


