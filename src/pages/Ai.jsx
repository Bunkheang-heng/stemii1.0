import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            aiRun();
        }
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-6 mb-[400px]">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ask me anything you want</h2>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl mb-6">
                {loading ? (
                    <div className="text-center text-blue-500">Loading ...</div>
                ) : (
                    <p className="text-gray-700">{aiResponse}</p>
                )}
            </div>
            <div className="flex flex-col sm:flex-row w-full max-w-3xl space-y-4 sm:space-y-0 sm:space-x-4">
                <input 
                    className="flex-1 px-4 py-2 text-lg text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your search"
                    onChange={(e) => handleChangeSearch(e)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="px-6 py-2 text-lg font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleClick()}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Ai;
