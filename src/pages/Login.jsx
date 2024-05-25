import React, { useState } from 'react';
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth, db } from '../firebase.Config';
import { doc, getDoc } from "firebase/firestore";
import Image1 from "../assets/image/Logo.jpg";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/profile");
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      toast.error("Bad user credentials");
      console.error("Error signing in:", error);
    }
    setLoading(false);
  };

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src={Image1} alt='Logo' className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <InputField
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              disabled={loading}
              required
            />
            <div className='relative mt-6'>
              <InputField
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                disabled={loading}
                required
              />
              {showPassword ? (
                <RiEyeCloseLine
                  className='absolute right-3 top-2 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <RiEyeFill
                  className='absolute right-3 top-2 text-xl cursor-pointer'
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <p className='mt-2'>
              <Link to="/forgetpassword" className='hover:text-red-500'>
                Forgot Password?
              </Link>
            </p>
            <button
              className='w-full bg-blue-500 px-7 py-3 text-white font-semibold rounded uppercase mt-4 shadow-md hover:bg-blue-700 disabled:opacity-50'
              type='submit'
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className='my-4 flex items-center before:border-t before:flex-1 before:border-gray-500 after:border-t after:flex-1 after:border-gray-500'>
              <p className='text-center font-semibold mx-4'>OR</p>
            </div>
            <button className='w-full bg-red-500 px-4 py-2 text-white font-semibold rounded shadow-md hover:bg-red-700'>
              <Link to='/register'>Register</Link>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const InputField = ({ type, id, value, onChange, placeholder, disabled, required }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
    disabled={disabled}
    required={required}
  />
);
