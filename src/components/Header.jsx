import React from 'react'
import Image1 from "../assets/image/Logo.jpg"
import { useLocation, useNavigate} from 'react-router-dom'


export default function Header() {
    const location = useLocation();
    const naviage = useNavigate(); 
    console.log(location); 
    function pathMatchRoute(route){
        if(route === location.pathname){
            return true; 
        }
    }
  return (

    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div className='flex'>
                
                <img src = {Image1} 
                alt='Stemii Logo' className='h-10 cursor-pointer rounded-xl' onClick={() => naviage("/")}/>
                <p className='ml-3 flex items-center'>Stemii Learning Stem</p>
            </div>
            <div>
                <ul className='flex space-x-10 '>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/") && "text-black border-b-black " } `} onClick={() => naviage("/")}>Home</li>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/course") && "text-black border-b-black "} `} onClick={() => naviage("/course")}>Course</li>
                    <li className={`py-3 cursor-pointer text-sm font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/login") && "text-black border-b-black "} `} onClick={() => naviage("/login")}>Login</li>
                    <li className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/register") && "text-black border-b-black "} `} onClick={() => naviage("/register")}>Register</li>
                    <li className={`py-3 text-sm cursor-pointer font-semibold text-gray border-b-[3px] border-b-transparent ${pathMatchRoute("/register") && "text-black border-b-black "} `} onClick={() => naviage("/ai")}>Ai</li>
                </ul>
            </div>
        </header>
    </div>
  )
}
