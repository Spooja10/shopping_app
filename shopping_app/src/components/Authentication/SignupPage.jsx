import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import './SignupPage.css';
import { getUser, signup } from '../../services/userServices';
import { Navigate } from 'react-router-dom';

const schema = z.object({
  email:z.string().email({message: "Please enter valid email address"}).min(3),
  password:z.string().min(8, {message: "Password should be atleast 8 characters"})
})

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here (e.g., validation, API calls)
  //   console.log(formData);
  // };

  const [formError, setFormError] = useState(" ");
  const [submissionMessage, setSubmissionMessage] = useState('');
  const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(schema)});

  const onSubmit = async(formData) => {
    try {
      await signup(formData, profilePic);  
      setSubmissionMessage("Submission successful! Redirecting...");
      window.location = "/"
    } catch (err) {
      if(err.response && err.response.status === 400){
          setFormError(err.res.data.message)
      }else {
        setFormError("An error occurred. Please try again.");
      }
    }
    
  };

  // click on login page it's redirect to home page
  if(getUser()) {
    return <Navigate to='/' />;
   }

  return (
    <div className="form-container">
      <h2>SignUp Form</h2>
      <div className="profile-container">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" alt="Profile" className="profile-image" />
        <button className="upload-button">UPLOAD IMAGE</button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-row">
          <input
            type="text"
            name="name"
            placeholder="Enter your name" {...register("name")}
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email address" {...register("email")}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            name="password"
            placeholder="Enter your password" {...register("password")}
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter confirm password" 
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <textarea
          name="address"
          placeholder="Enter delivery address"  {...register("address")}
          value={formData.address}
          onChange={handleChange}
        />

        {formError && <em className='form_error'>{formError}</em>}
        {submissionMessage && <em className='form_message'>{submissionMessage}</em>}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default SignupPage;
