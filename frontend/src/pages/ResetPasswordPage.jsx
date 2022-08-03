
import React from 'react'
import {toast} from "react-toastify";
import {AiTwotoneLock} from "react-icons/ai";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { resetForPassword } from '../features/auth/AuthSlice';
import { resetFunction } from '../features/auth/AuthSlice';

//Reset Password Page
function ResetPasswordPage() {

  //Set dispatch, navigate, and params

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let params = useParams();

  //Global state of user

  let {user, isError, isSuccess, message} = useSelector(state => state.auth);
  
  //Set state for form

  let [password, setPassword] = useState("");

  //Set effect for page
  useEffect(() => {
      if (user) {
        navigate("/")
      }
  },[user])

  //Set second effect for page

  useEffect(() => {
      if (isError) {
        toast.error(message);
      } else if (isSuccess) {
          toast.success(message);
          navigate("/login");
      }
      
      dispatch(resetFunction());
  },[isError, message, navigate, isSuccess, dispatch]);

  //Set changes for form

  const handleChange = (e) => {

    setPassword(e.target.value);
  };

  //Set submit for form

  const handleSubmit = (et) => {

      et.preventDefault();

      let inputResult = {
        resetToken: params.resetToken,
        inputData: {
          "newPassword": password
        }
      };

    

      dispatch(resetForPassword(inputResult));

      setPassword("");

  };
  
    
  return (
    <div className="w-10/12 mx-auto mt-10">
      <h1 className='text-black font-bold text-3xl mb-5'> Reset Password! </h1>
      <p className='text-black font-bold text-xl mb-5'> Please fill you new password in a box as below! </p>

      <div className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group relative mb-5'>
              <input type="password" name="password" id="password" value={password} onChange={handleChange} className='w-full bg-slate-200 rounded-lg shadow-lg py-5 pl-10 focus:outline-0'/>
              <label htmlFor="password" className='absolute top-4 left-2'> <AiTwotoneLock className='inline-block text-black' size={30}/> </label>
          </div>

          <div className='form-group'>
              <button type="submit" className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200'> Update new password! </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage