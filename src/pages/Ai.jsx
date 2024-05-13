import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/css/Ai.css"


const Ai = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBA38XHnqN5IwxgFw-XJ9Sd5ibQ3waRqNU');

    const [search, setSearch] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    async function aiRun() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${search} `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = () => {
        aiRun();
    }

    return (
        <div className="ai-help-container">
            <h2 className="ai-help-header">Helping to Choose the Major</h2>
            <div className="ai-help-response">
                {loading ? (
                    <div className="ai-help-loading">Loading ...</div>
                ) : (
                    <p>{aiResponse}</p>
                )}
            </div>
            <div className="ai-help-input-container">
                <input className="ai-help-input" placeholder="Enter your search" onChange={(e) => handleChangeSearch(e)} />
                <button className="ai-help-button" onClick={() => handleClick()}>Search</button>
            </div>
        </div>
    );
};

export default Ai;