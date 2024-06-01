import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/css/Selfaccessment.css"

const CourseRecommendation = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBA38XHnqN5IwxgFw-XJ9Sd5ibQ3waRqNU');

    const [answers, setAnswers] = useState(Array(10).fill(''));
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const questions = [
        "Which STEM field are you most interested in?",
        "What type of learning format do you prefer?",
        "How much time can you dedicate to learning each week?",
        "What is your current education level?",
        "Which specific topics within Science interest you the most?",
        "Which specific topics within Technology interest you the most?",
        "Which specific topics within Engineering interest you the most?",
        "Which specific topics within Mathematics interest you the most?",
        "What motivates you to learn STEM subjects?",
        "How do you prefer to interact with other learners?"
    ];

    const options = [
        ["Science", "Technology", "Engineering", "Mathematics"],
        ["Video lectures", "Interactive tutorials", "Text-based lessons", "Hands-on projects"],
        ["Less than 1 hour", "1-3 hours", "3-5 hours", "More than 5 hours"],
        ["Elementary school", "Middle school", "High school", "College/University", "Working professional"],
        ["Biology", "Chemistry", "Physics", "Environmental Science"],
        ["Coding/Programming", "Artificial Intelligence", "Cybersecurity", "Web Development"],
        ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Robotics"],
        ["Algebra", "Calculus", "Statistics", "Geometry"],
        ["Personal interest and curiosity", "Academic requirements", "Career advancement", "Problem-solving skills"],
        ["Discussion forums", "Live chat", "Group projects", "I prefer to learn alone"]
    ];

    const handleChangeAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleAdditionalInfoChange = (e) => {
        setAdditionalInfo(e.target.value);
    };

    async function analyzeAnswers() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Recommend the best STEM courses for the user, based on the following answers, :\n${answers.join(', ')}\nAdditional Information: ${additionalInfo}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    return (
        <div className="ai-recommendation-container">
            <h2 className="ai-recommendation-header">Self Accessment</h2>
            <div className="ai-questionnaire">
                {questions.map((question, index) => (
                    <div key={index} className="ai-question">
                        <p>{question}</p>
                        {options[index].map((option, idx) => (
                            <label key={idx} className="ai-option">
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value={option}
                                    onChange={() => handleChangeAnswer(index, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
            </div>
            <div className="ai-additional-info">
                <textarea
                    className="ai-additional-info-input"
                    placeholder="If you want to provide more information, enter it here..."
                    value={additionalInfo}
                    onChange={handleAdditionalInfoChange}
                ></textarea>
            </div>
            <div className="ai-recommendation-response">
                {loading ? (
                    <div className="ai-loading">Analyzing your answers...</div>
                ) : (
                    <p>{aiResponse}</p>
                )}
            </div>
            <button className="ai-recommendation-button" onClick={() => analyzeAnswers()}>Get Recommendation</button>
        </div>
    );
};

export default CourseRecommendation;