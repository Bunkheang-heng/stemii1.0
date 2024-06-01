import React, { useState, useEffect } from 'react';
import Image1 from "../assets/image/2.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Add Firestore imports
import "../assets/css/Header.css";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Add state for admin role
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsLoggedIn(true);
                const db = getFirestore();
                const userDoc = doc(db, "users", user.uid); // Assuming user data is stored under 'users' collection
                const userDocSnap = await getDoc(userDoc);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    if (userData.role === "admin") {
                        setIsAdmin(true);
                    }
                }
            } else {
                setIsLoggedIn(false);
                setIsAdmin(false); // Reset admin state when user logs out
            }
        });
    }, []);

    function pathMatchRoute(route) {
        return route === location.pathname;
    }

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
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
                <div className='relative'>
                    <ul className='flex space-x-10'>
                        <li 
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-black"}`} 
                            onClick={() => navigate("/")}
                        >
                            Home
                        </li>
                        <li 
                            className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/course") && "text-black border-b-black"}`} 
                            onClick={() => navigate("/course")}
                        >
                            Course
                        </li>
                        {isLoggedIn ? (
                            <li 
                                className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/profile") && "text-black border-b-black"}`} 
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </li>
                        ) : (
                            <li 
                                className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/login") && "text-black border-b-black"}`} 
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </li>
                        )}
                        <li 
                            className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/ai") && "text-black border-b-black"}`} 
                            onClick={() => navigate("/aboutus")}
                        >
                            About Us
                        </li>
                        <li 
                            className='relative py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent' 
                            onClick={() => setShowMore(!showMore)}
                        >
                            More
                            {showMore && (
                                <ul className='absolute bg-white shadow-lg rounded-md mt-2 p-3 right-0 w-48'>
                                    <li 
                                        className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/news") && "text-black border-b-black"}`} 
                                        onClick={() => { navigate("/news"); setShowMore(false); }}
                                    >
                                        News
                                    </li>
                                    <li 
                                        className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/community") && "text-black border-b-black"}`} 
                                    >
                                        <a href="https://t.me/STEMiiiii" target="_blank" rel="noopener noreferrer">Community</a>
                                    </li>
                                    <li 
                                        className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/selfaccessment") && "text-black border-b-black"}`} 
                                    >
                                        <Link to="/selfaccessment">Self Assessment</Link>
                                    </li>
                                        <li 
                                className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/ai") && "text-black border-b-black"}`} 
                                onClick={() => navigate("/ai")}
                            >
                                AI
                            </li>
                                    {isAdmin && (
                                        <li 
                                            className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/admin") && "text-black border-b-black"}`} 
                                        >
                                            <Link to="/admin">Admin</Link>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
}
