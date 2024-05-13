import React, { useState } from 'react'
import Image1 from "../assets/image/Logo.jpg"
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeFill } from "react-icons/ri"
import { Link } from 'react-router-dom';


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:"",
});
  const {email, password} = formData;
  function onChange(e){
    setFormData((prevState) =>({
        ...prevState,
        [e.target.id]:e.target.value,
    }))
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>
        Sign In
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src={Image1} alt='Logo' className='w-full rounded-2xl '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input type='email'id='email' value={email} onChange={onChange} placeholder='Email' 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />

            <div className='relative'>
            <input type={showPassword ? "text" : "password"} id='password' value={password} onChange={onChange} placeholder='Password' 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mt-6' />
            {showPassword ? 
            (<RiEyeCloseLine className='absolute right-3 top-10 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>) : (<RiEyeFill className='absolute right-3 top-10 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=>!prevState)}/>)}

            <p className='mt-2'> <Link to="/forgetpassword" className='hover:text-red-500'>Forget Passoword?</Link></p>
            </div>

            <button className='w-full bg-blue-500 px-7 py-3 text-white font-semibold rounded uppercase mt-4 shadow-md hover:bg-blue-300' 
              type='submit'
            >
              Login
            </button>

                <div className=' my-4  flex items-center before:border-t  before:flex-1  before:border-gray-500 after:border-t  after:flex-1  after:border-gray-500'>
                  <p className='text-center mt-4 font-semibold mx-4'>OR</p>
                </div>

                <div>
                <button className='w-full bg-red-500 mt-2 px-4 py-2 text-white font-semibold rounded hover:bg-red-300 shadow-md'>
                <a href='https://web.telegram.org/k/' >Register</a> </button>
                </div>

          </form>
        </div>
      </div>
    </section>
  )
}
