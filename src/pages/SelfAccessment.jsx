import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "../assets/css/Selfaccessment.css"

const CourseRecommendation = () => {
    const genAI = new GoogleGenerativeAI('AIzaSyBA38XHnqN5IwxgFw-XJ9Sd5ibQ3waRqNU');

    const [answers, setAnswers] = useState(Array(10).fill(''));
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [aiResponse, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState('en');

    const questions = {
        en: [
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
        ],
        kh: [
            "តើមុខវិជ្ជាស្ទឹមណាដែលអ្នកចាប់អារម្មណ៍ជាងគេ?",
            "តើអ្នកចូលចិត្តទម្រង់សិក្សាណា?",
            "តើអ្នកអាចឧទ្ទិសពេលវេលាប៉ុន្មានក្នុងមួយសប្តាហ៍ដើម្បីសិក្សា?",
            "តើកំរិតការអប់រំនៃបច្ចុប្បន្នរបស់អ្នកជាអ្វី?",
            "តើប្រធានបទជាក់លាក់ណាដែលអ្នកចាប់អារម្មណ៍ក្នុងវិទ្យាសាស្ត្រ?",
            "តើប្រធានបទជាក់លាក់ណាដែលអ្នកចាប់អារម្មណ៍ក្នុងបច្ចេកវិទ្យា?",
            "តើប្រធានបទជាក់លាក់ណាដែលអ្នកចាប់អារម្មណ៍ក្នុងវិស្វកម្ម?",
            "តើប្រធានបទជាក់លាក់ណាដែលអ្នកចាប់អារម្មណ៍ក្នុងគណិតវិទ្យា?",
            "អ្វីដែលជំរុញអ្នកឱ្យសិក្សាវិទ្យាសាស្ត្រ?",
            "តើអ្នកចូលចិត្តសំដែងអារម្មណ៍ជាមួយអ្នកសិក្សាផ្សេងទៀតដូចម្តេច?"
        ]
    };

    const options = {
        en: [
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
        ],
        kh: [
            ["វិទ្យាសាស្ត្រ", "បច្ចេកវិទ្យា", "វិស្វកម្ម", "គណិតវិទ្យា"],
            ["វីដេអូសិក្សា", "ការណែនាំអន្តរកម្ម", "មេរៀនដោយអត្ថបទ", "គម្រោងជាក់ស្តែង"],
            ["តិចជាង 1 ម៉ោង", "1-3 ម៉ោង", "3-5 ម៉ោង", "ច្រើនជាង 5 ម៉ោង"],
            ["បឋមសិក្សា", "មធ្យមសិក្សា", "វិទ្យាល័យ", "សាកលវិទ្យាល័យ", "អ្នកមានវិជ្ជាជីវៈ"],
            ["ជីវវិទ្យា", "គីមីវិទ្យា", "រូបវិទ្យា", "វិទ្យាសាស្ត្របរិស្ថាន"],
            ["ការកូដ/ការសរសេរកម្មវិធី", "បញ្ញាសិប្បនិម្មិត", "សន្ដិសុខបណ្តាញ", "ការអភិវឌ្ឍវែប"],
            ["វិស្វកម្មមេកានិច", "វិស្វកម្មអគ្គិសនី", "វិស្វកម្មស៊ីវិល", "រ៉ូបូត"],
            ["អាល់ជឺប្រា", "គណនាវិទ្យា", "ស្ថិតិ", "ធរណីមាត្រ"],
            ["ការចាប់អារម្មណ៍ផ្ទាល់ខ្លួននិងចម្ងល់", "តម្រូវការសិក្សា", "ការរីកចម្រើនវិជ្ជាជីវៈ", "ជំនាញដោះស្រាយបញ្ហា"],
            ["វេទិកាពិភាក្សា", "ជជែកផ្ទាល់", "គម្រោងក្រុម", "ខ្ញុំចូលចិត្តសិក្សាដោយខ្លួនឯង"]
        ]
    };

    const handleChangeAnswer = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleAdditionalInfoChange = (e) => {
        setAdditionalInfo(e.target.value);
    };

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'kh' : 'en'));
    };

    async function analyzeAnswers() {
        setLoading(true);
        setResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = language === 'en' 
            ? `Recommend the best STEM courses for the user, based on the following answers, :\n${answers.join(', ')}\nAdditional Information: ${additionalInfo}` 
            : `សូមណែនាំវគ្គសិក្សាវិទ្យាសាស្ត្រល្អបំផុតសម្រាប់អ្នកប្រើប្រាស់ដោយផ្អែកលើចម្លើយខាងក្រោម:\n${answers.join(', ')}\nព័ត៌មានបន្ថែម: ${additionalInfo}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setResponse(text);
        setLoading(false);
    }

    return (
        <div className="ai-recommendation-container">
            <button onClick={toggleLanguage} className='bg-blue-400 w-[100px] h-[50px] text-white rounded-lg hover:bg-slate-400'>
                {language === 'en' ? 'ភាសាខ្មែរ' : 'English'}
            </button>
            <h2 className="ai-recommendation-header">
                {language === 'en' ? 'Self Assessment' : 'ការស្វែងរកជំនាញដោយខ្លួនឯង'}
            </h2>
            <div className="ai-questionnaire">
                {questions[language].map((question, index) => (
                    <div key={index} className="ai-question">
                        <p>{question}</p>
                        {options[language][index].map((option, idx) => (
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
                    placeholder={language === 'en' ? "If you want to provide more information, enter it here..." : "ប្រសិនបើអ្នកចង់ផ្ដល់ព័ត៌មានបន្ថែម សូមវាយនៅទីនេះ..."}
                    value={additionalInfo}
                    onChange={handleAdditionalInfoChange}
                ></textarea>
            </div>
            <div className="ai-recommendation-response">
                {loading ? (
                    <div className="ai-loading">{language === 'en' ? 'Analyzing your answers...' : 'កំពុងវិភាគចម្លើយរបស់អ្នក...'}</div>
                ) : (
                    <p>{aiResponse}</p>
                )}
            </div>
            <button className="ai-recommendation-button" onClick={() => analyzeAnswers()}>
                {language === 'en' ? 'Get Recommendation' : 'ទទួលបានការណែនាំ'}
            </button>
        </div>
    );
};

export default CourseRecommendation;
