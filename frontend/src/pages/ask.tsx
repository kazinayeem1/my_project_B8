
import React, { useState } from 'react';
import axios from 'axios';


const AskPage: React.FC = () => {
  
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
  
    const handleQuery = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/ask?q=${question}`);
      setAnswer(JSON.stringify(res.data));
    };
  
    return (
      <div style={{ padding: 20 }}>
        <h1>Ask a Question</h1>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Enter comma-separated feature values"
        />
        <button onClick={handleQuery}>Ask</button>
        <p>{answer}</p>
      </div>
    );
  
  
};

export default AskPage;




 