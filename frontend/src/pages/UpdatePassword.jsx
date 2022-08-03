
import React from 'react';
import {MdOutlinePassword} from "react-icons/md";
import {RiLockPasswordFill} from "react-icons/ri";
import { useState } from 'react';
import {toast} from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { updateForPassword } from '../features/auth/AuthSlice';
import { resetForLogin } from '../features/auth/AuthSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';

//Update Password Form with Authorization
function UpdatePassword() {

    //Set state for form
    let [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    //Set navigate and dispatch

    let navigate = useNavigate();
    let dispatch = useDispatch();

    //Global state of user

    let {isSuccess, isError, message, isLoading} = useSelector(state => state.auth);

    //Set effect for page

    useEffect(() => { 

        if (isError) {
            toast.error(message);
        };

        if (isSuccess) {
            toast.success(message);
            navigate("/profile");
        };

        dispatch(resetForLogin());

    },[isError, isSuccess, message, dispatch, navigate])

    //Set changes for data in form

    const handleChange = (e) => {
        
        let {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Set handle for submit

    const handleSubmit = (e) => {
        
        e.preventDefault();

     

        dispatch(updateForPassword(formData));

        setFormData({
            currentPassword: "",
            newPassword: "",
        });

    };


    if (isLoading) {
        return (<Spinner />);
    }


  return (
    <div className='w-11/12 mx-auto my-10'>
        <h1 className='text-black font-bold text-3xl'> Update Password! </h1>
        <p className='mt-5 text-black text-lg'> Please fill your current password and new password to update password! </p>

        <div className='form my-5'>
            <form onSubmit={handleSubmit}>
                <div className='form-group relative mb-5'>
                    <input type="password" name="currentPassword" id="currentPassword" value={formData.currentPassword} onChange={handleChange} placeholder='Enter your current password' className="bg-white w-full rounded-lg shadow-lg pl-10 py-5 focus:outline-0"/>
                    <label htmlFor="currentPassword" className='absolute left-2 top-5'> <MdOutlinePassword size={25}/> </label>
                </div>

                <div className='form-group relative mb-5'>
                    <input type="password" name="newPassword" id="newPassword" value={formData.newPassword} onChange={handleChange} placeholder='Enter your current password' className="bg-white w-full rounded-lg shadow-lg pl-10 py-5 focus:outline-0"/>
                    <label htmlFor="newPassword" className='absolute left-2 top-5'> <RiLockPasswordFill size={25}/> </label>
                </div>

                <div className="form-group">
                    <button type="submit" className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200'> Update Password </button>
                </div>

                
            </form>
        </div>
    </div>
  )
}

export default UpdatePassword