import React from 'react'
import "../assets/css/Register.css"

export default function Register() {
  return (
    <div>
    <div className="subscription-cards">
      <div className="card">
        <h2>Monthly</h2>
        <p>Access to basic features</p>
        <p className='price'>$9.99/month</p>
      </div>
      <div className="card">
        <h2>Yearly</h2>
        <h3 className='text-xl font-semibold mb-2'>Recommended</h3>
        <p>Access to standard features</p>
        <p className='price'>$59.99/year</p>
      </div>
      <div className="card">
        <h2>Lifetime</h2>
        <p>Access to course forever</p>
        <p className='price'> $169.99/month</p>
      </div>
    </div>
        <div className='w-[80%] mt-12 '>
                <button className='w-full bg-red-500 mt-2 px-4 py-2 text-white font-semibold rounded hover:bg-red-300 shadow-md'>
                <a href='https://web.telegram.org/k/' >Register</a> </button>
                </div>
        </div>
  );
}
