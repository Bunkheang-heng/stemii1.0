import React, { useState, useEffect } from 'react';
import Image1 from "../assets/image/Logo.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../assets/css/Header.css";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    function pathMatchRoute(route) {
        return route === location.pathname;
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50 '>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div className='flex'>
                    <img 
                        src={Image1} 
                        alt='Stemii Logo' 
                        className='h-10 cursor-pointer rounded-xl' 
                        onClick={() => navigate("/")}
                    />
                    <p className='ml-3 flex items-center'>Stemii Learning Stem</p>
                </div>
                <div>
                    <ul className='flex space-x-10 '>
                        <li 
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-black "}`} 
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li 
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/course") && "text-black border-b-black "}`} 
                            onClick={() => navigate("/course")}
                        >
                            Course
                        </li>
                        {isLoggedIn ? (
                            <li 
                                className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/profile") && "text-black border-b-black "}`} 
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </li>
                        ) : (
                            <li 
                                className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/login") && "text-black border-b-black "}`} 
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </li>
                        )}
                        <li 
                            className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/ai") && "text-black border-b-black "}`} 
                            onClick={() => navigate("/ai")}
                        >
                            Ai
                        </li>
                        <li 
                            className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/news") && "text-black border-b-black "}`} 
                            onClick={() => navigate("/news")}
                        >
                            News
                        </li>

                        <li 
                            className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/news") && "text-black border-b-black "}`} 
                            
                        >
                            <Link to="https://t.me/STEMiiiii">Community</Link>
                            
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
