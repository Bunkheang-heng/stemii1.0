import React from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/Footer.css";

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
                <div>
                    <p>&copy; 2024 Stemii Learning Stem. All rights reserved.</p>
                    <p className="text-sm">Designed and developed by YourName</p>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

