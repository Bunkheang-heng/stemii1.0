import React, { useState } from 'react';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase.Config';
import { doc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    email: auth.currentUser.email,
  });

  function onLogout() {
    auth.signOut();
    navigate('/');
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit() {
    try {
      const { email } = formData;
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { email });
      toast.success("Edit successfully");
    } catch (e) {
      toast.error("Could not update the profile");
    }
  }

  const { email } = formData;

  return (
    <>
      <section className='max-w-4xl mx-auto flex justify-center items-center flex-col mt-10 mb-[300px]'>
        <h1 className='text-4xl font-bold text-gray-800 mb-6'>My Profile</h1>
        <div className='w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg p-6'>
          <form>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-gray-700 text-lg font-semibold mb-2'>Email</label>
              <input
                type="email"
                id='email'
                value={email}
                disabled={!changeDetail}
                onChange={onChange}
                className={`w-full px-4 py-2 text-lg text-gray-800 border ${changeDetail ? 'border-red-500 bg-red-50 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              />
            </div>
            <div className='flex justify-between items-center mt-6'>
              <p className='text-gray-700 text-lg'>
                Do you want to change your info?
                <span
                  className='ml-2 text-blue-600 hover:text-blue-800 cursor-pointer'
                  onClick={() => {
                    if (changeDetail) onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className='text-red-600 hover:text-red-800 cursor-pointer'>
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
