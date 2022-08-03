
import React from 'react';
import { useState } from 'react';
import {toast} from "react-toastify";
import {AiOutlineUser} from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetFunction } from '../features/auth/AuthSlice';
import { forgetPasswordForUser } from '../features/auth/AuthSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//Forget Password Page
function ForgetPage() {

    //Global State of User

    let {user, isError, isSuccess, message} = useSelector((state) => state.auth);

    //Set Dispatch and Navigate
    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Set Effect of Page
    useEffect(() => {
        if (user) {
            navigate("/profile")
        }
    }, [user, navigate]);

    //Set second effect of page

    useEffect(() => {
        if (isError) {
            toast.error(message);
        };

        if (isSuccess) {
            toast.success(message);
        };

        dispatch(resetFunction());
        
    }, [isError, isSuccess, message, dispatch]);

    //Set state for page

    let [email, setEmail] = useState("");

    //Set changes for form

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    //Submit form

    const handleSubmit = (e) => {
        e.preventDefault();

        let webpage_URL = `${window.location.protocol}//${window.location.host}`;
        
        let inputData = {
            email: email,
            webpage_URL: webpage_URL
        };

        dispatch(forgetPasswordForUser(inputData));

        setEmail("");
    };

  return (
    <div className='w-10/12 mx-auto mt-10'>
        <Link to="/login">
        <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200 mb-5'>
            Back 
        </div>
        </Link>
       <h1 className='text-3xl font-bold text-black mb-5'> Forget Password! </h1>
        <p className='text-lg font-bold text-black mb-5'> Please fill your email in an input as below </p>
       <div className='form'>
        <form onSubmit={handleSubmit}>

            <div className='form-group relative mb-5'>
                <input type="email" name="email" value={email} onChange={handleChange} className='w-full bg-slate-200 rounded-lg shadow-lg pl-10 py-5 focus:outline-0'/>
                <label htmlFor="email" className='absolute top-4 left-2'> <AiOutlineUser size={28} color={"black"}/> </label>
            </div>

            <div className='form-group mb-5'>
                <button type='submit' className='btn btn-lg bg-emerald-400 text-white hover:bg-slate-200 hover:text-emerald-400'> Submit </button>
            </div>

        </form>
       </div>
    </div>
  )
}

export default ForgetPage