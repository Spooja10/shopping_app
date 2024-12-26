import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import { zodResolver } from '@hookform/resolvers/zod'

import './LoginPage.css'
import { Navigate, useLocation } from 'react-router-dom'
import { getUser } from '../../services/userServices'

const schema = z.object({
    email:z.string().email({message: "Please enter valid email address"}).min(3),
    password:z.string().min(8, {message: "Password should be atleast 8 characters"})
})

const LoginPage = () => {
   const [formError, setFormError] = useState(" ");
   const location = useLocation()
   const [submissionMessage, setSubmissionMessage] = useState('');
   const {register, handleSubmit, formState:{errors}} = useForm({resolver:zodResolver(schema)});

   const onSubmit = async (formData) => {
    try {
      await login(formData) 
      setSubmissionMessage("Submission successful! Redirecting...");
      const {state} = location = "/"
      window.location = state ? state.form : "/";
    } catch (err) {
        if(err.response && err.response.status === 400){
            setFormError(err.res.data.message)
        }else {
            setFormError("An error occurred. Please try again.");
          }
    }
    
   }
   // click on login page it's redirect to home page
   if(getUser()) {
    return <Navigate to='/' />;
   }

  return (
    <section className="align_center form_page">
        <form className='authentication_form' onSubmit={handleSubmit(onSubmit)}>
            <h2>Login Form</h2>
            <div className="form_inputs">
                 {/* <div>
                    <label htmlFor="name"> Name </label>
                    <input type="name" id="name" className='form_text_input' placeholder='enter your name' {...register("name", {required:true, minLength:3})}/>
                    {errors.name?.type === "required" && <em className='form_error'>Please Enter Your Name</em>}
                    {errors.name?.type === "minLength" && <em className='form_error'>Name should be 3 or more characters</em>}
                </div> 
                <div>
                    <label htmlFor="phone"> Phone Number </label>
                    <input type="number" id="phone" className='form_text_input' placeholder='enter your phone number' {...register("phone", {valueAsNumber:true})}/>      
                </div>  */}
                <div>
                    <label htmlFor="email"> Email </label>
                    <input type="email" id="email" className='form_text_input' placeholder='enter your email address' {...register("email")}/>
                    {errors.email && <em className='form_error'>{errors.email.message}</em>}
                </div>
                <div>
                    <label htmlFor="password"> Password </label>
                    <input type="password" id="password" className='form_text_input' placeholder='enter your password' {...register("password")}/>    
                    {errors.password && <em className='form_error'>{errors.password.message}</em>}  
                </div>

                {formError && <em className='form_error'>{formError}</em>}
                {submissionMessage && <em className='form_message'>{submissionMessage}</em>}
 
                <button type="submit" className='search_button form_submit'>Submit</button>
            </div>
        </form>
    </section>
  )
}

export default LoginPage;

//----- to show & hide pswrd using useRef Hook ------
// <button type='button' onClick={() => passwordRef.current.type = "password"}>Hide Password</button>
// <button type='button' onClick={() => passwordRef.current.type = "password"}>Show Password</button>

// parseInt - to convert string into number

// npm i react-hook-form@7.43.9 - ruseRef hook
// npm i zod@3.21.4 - schema library for form validation
// "schema" is a set of rules for fields (validation rules in single place)
// npm i @hookform/resolvers@3.0.1 - to apply schema to form