import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.Config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user" // default role is 'user'
  });
  const { email, password, role } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: role
      });

      navigate("/");
    } catch (error) {
      toast.error("Error registering user");
      console.error("Error registering user:", error);
    }
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type='email'
          id='email'
          value={email}
          onChange={onChange}
          placeholder='Email'
          required
        />
        <input
          type='password'
          id='password'
          value={password}
          onChange={onChange}
          placeholder='Password'
          required
        />
        <select id='role' value={role} onChange={onChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type='submit'>Register</button>
      </form>
    </section>
  );
}
