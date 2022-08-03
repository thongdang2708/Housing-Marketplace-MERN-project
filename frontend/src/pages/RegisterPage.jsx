
import React from 'react'
import {BsFillBagFill} from "react-icons/bs";
import {AiOutlineUser} from "react-icons/ai";
import {AiTwotoneLock} from "react-icons/ai";
import { useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { registerUser } from '../features/auth/AuthSlice';
import Spinner from '../components/layouts/Spinner';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { resetFunction } from '../features/auth/AuthSlice';
import { Link } from 'react-router-dom';

//Register Page

function RegisterPage() {

    //Set State for Form
    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Global state of user
    let {user, isError, isLoading, isSuccess, message} = useSelector(state => state.auth);

    //Set effect for register page

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        };
        dispatch(resetFunction());

    },[isError, message, isSuccess, user, navigate, dispatch])

    //Handle Change in Form
    const handleChange = (e) => {

        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Handle Submit for Form

    const handleSubmit = (e) => {
        e.preventDefault();

        let inputData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        dispatch(registerUser(inputData));


        setFormData({
            name: "",
            email: "",
            password: ""
        });

    };

    if (isLoading) {
        return (<Spinner />);
    }

  return (
    <div className='mt-10 w-11/12 mx-auto'>
        <h1 className='text-black font-bold text-3xl'> Sign Up! </h1>

        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group my-8 relative'>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className=' bg-slate-200 w-full pl-10 py-5 focus:outline-0 rounded-lg shadow-lg' placeholder='Enter your name!'/>
                    <label htmlFor="name" className='absolute left-3 top-6'> <BsFillBagFill /> </label>
                </div>

                <div className='form-group my-8 relative'>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className=' bg-slate-200 w-full pl-10 py-5 focus:outline-0 rounded-lg shadow-lg' placeholder='Enter your email!'/>
                    <label htmlFor="email" className='absolute left-3 top-5'> <AiOutlineUser size={20}/> </label>
                </div>

                <div className='form-group my-8 relative'>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className=' bg-slate-200 w-full pl-10 py-5 focus:outline-0 rounded-lg shadow-lg' placeholder='Enter your password!'/>
                    <label htmlFor="password" className='absolute left-3 top-6'> <AiTwotoneLock size={20}/> </label>
                </div>

                <div className='form-group'>
                        <Link to={"/login"}>
                        <h3 className='text-xl font-bold text-emerald-400 cursor-pointer'> Already have an account?  </h3>
                        </Link>
                </div>

                <div className='form-group'>
                    <button type="submit" className='btn btn-lg bg-emerald-400 focus:outline-0 text-white my-8 hover:bg-slate-200'> Sign Up </button>
                </div>

               
               
            </form>
        </div>
    </div>
  )
}

export default RegisterPage