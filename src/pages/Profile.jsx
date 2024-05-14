import React, { useState } from 'react'
import { getAuth } from "firebase/auth"
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

  function onLogout(){
    auth.signOut();
    navigate('/');
  }

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(){
    try {
      const { email } = formData;
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { email });
      toast.success("Edit successfully");
    } catch(e) {
      toast.error("Could not update the profile");
    }
  }

  const { email } = formData;

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-10 font-bold'>My Admin</h1>
        <div className='w-full md:w-[50%] mt-6 px-3 '>
          <form>
            <input 
              type="email" 
              id='email' 
              value={email} 
              disabled={!changeDetail} 
              onChange={onChange} 
              className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 
                ${changeDetail && "bg-red-500 focus:bg-red-200"}`} 
            />
            <div className='flex justify-between whitespace-nowrap text-lg '>
              <p className='flex items-center mb-6'>
                Do you want to change your info?
                <span 
                  className='text-red-600 hover:text-red-900 transition ease-in-out duration-200 ml-1 cursor-pointer' 
                  onClick={() => {
                    if (changeDetail) onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p onClick={onLogout} className='text-red-600 hover:text-blue-500 transition ease-in-out duration-200 cursor-pointer'>
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
