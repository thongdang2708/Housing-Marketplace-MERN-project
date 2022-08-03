
import React from 'react';
import {AiOutlineUser} from "react-icons/ai";
import {AiTwotoneLock} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/AuthSlice';
import { resetForLogin } from '../features/auth/AuthSlice';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';

//Set Login Form
function LoginPage() {

    //Set state for form
    let [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Global state of form

    let {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth);

    //Set effect of form

    useEffect(() => {

        if (isError) {
            toast.error(message);
        };

        if (isSuccess || user) {
            navigate("/profile");
        };

     
        dispatch(resetForLogin());

    },[dispatch, navigate, isError, isSuccess, user, message])

    //Set change for form
    const handleChange = (e) => {
        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Submit form

    const onSubmit = (e) => {
        e.preventDefault();

        let inputData = {
            email: formData.email,
            password: formData.password
        };

        dispatch(loginUser(inputData));

        setFormData({
            email: "",
            password: ""
        });
    };

    if (isLoading) {
        return (<Spinner />)
    }

    return (
        <div className="w-10/12 mx-auto my-10">
            <div>
            <h1 className='text-black font-bold text-3xl mb-5'> Sign In! </h1>

            <div className="form">
                <form onSubmit={onSubmit}>
                    <div className='form-group relative mb-5'>
                        <input type="email" name="email" id="email" placeholder='Enter your email' value={formData.email} onChange={handleChange} className='w-full bg-slate-200 rounded-lg shadow-lg pl-10 py-5 focus:outline-0'/>
                        <label htmlFor="email" className='absolute left-1 top-4'> <AiOutlineUser color={"black"} size={30} /> </label>
                    </div>

                    <div className='form-group relative mb-5'>
                        <input type="password" name="password" id="password" placeholder='Enter your password' value={formData.password} onChange={handleChange} className='w-full bg-slate-200 rounded-lg shadow-lg pl-10 py-5 focus:outline-0'/>
                        <label htmlFor="password" className='absolute left-1 top-4'> <AiTwotoneLock color={"black"} size={30} /> </label>
                    </div>
                    
                    <div className='form-group text-end mb-5'>
                        <Link to={"/forgetpassword"}>
                        <h3 className='text-xl font-bold text-emerald-400 cursor-pointer'> Forget Password </h3>
                        </Link>
                    </div>

                    <div className='form-group text-end'>
                        <Link to={"/register"}>
                        <h3 className='text-xl font-bold text-emerald-400 cursor-pointer'> Register an account?  </h3>
                        </Link>
                    </div>


                    <div className='form-group relative mb-5'>
                        <button type='submit' className='btn btn-lg bg-emerald-400 focus:outline-0 hover:bg-slate-200 text-white'> Sign In! </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default LoginPage