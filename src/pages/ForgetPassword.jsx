import React, { useState } from 'react'
import Image1 from "../assets/image/Logo.jpg"
import { Link } from 'react-router-dom';


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  function onChange(e){
    setEmail(e.target.value);
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>
        Forgot Password
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
          <img src={Image1} alt='Logo' className='w-full rounded-2xl '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input type='email'id='email' value={email} onChange={onChange} placeholder='Email' 
            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' />
                 
            <button className='w-full bg-blue-500 px-7 py-3 text-white font-semibold rounded uppercase mt-4 shadow-md hover:bg-blue-300' 
              type='submit'
            >
              Sent Reset Password
            </button>

            <div className='text-center'>
                <p className='mt-2'> <Link to="/login" className='hover:text-red-500 text-lg'>Login</Link></p>
                </div>
              
          </form>
        </div>
      </div>
    </section>
  )
}
