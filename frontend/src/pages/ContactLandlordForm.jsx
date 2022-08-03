
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getForAll } from '../features/auth/AuthSlice';
import { useEffect } from 'react';
import {toast} from "react-toastify";
import { useState } from 'react';
import { addForMessage } from '../features/message/MessageSlice';
import { resetFunctionForMessage } from '../features/message/MessageSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';

//Page to contact landlord
function ContactLandlordForm() {

    let search = useLocation().search;
    let landlordId = new URLSearchParams(search).get("landlord");
    let housingId = new URLSearchParams(search).get("housing");


    //Global state of landlord

    let {users, user, isError, message} = useSelector(state => state.auth);

    //Global state of messsage

    let {messageForMessage, isErrorForMessage, isSuccessForMessage, isLoadingForMessage} = useSelector(state => state.message);

    //Set dispatch and navigate
    let dispatch = useDispatch();
    let navigate = useNavigate();

    //Set state for data in form
    let [contactMessage, setContactMessage] = useState("");


    //Set effect to check whether an authorized user go to contact form to send message to himself/herself

    useEffect(() => {

        if (user.id.toString() === landlordId.toString()) {
            toast.error("This landlord cannot send message to himself or herself");
            navigate(`/category/${housingId}`)
            //eslint-disabled-next-line
        }

        
    },[user.id, landlordId]);

    //Set effect to fetch all users
    useEffect(() => {

        if (isError) {
            toast.error(message)
        };

        dispatch(getForAll());
    },[isError, message]);

    //Set effect when submitting form to send message to landlord

    useEffect(() => {
        if (isErrorForMessage) {
            toast.error(messageForMessage)
        };

        if (isSuccessForMessage) {
            toast.success(messageForMessage);
            navigate(`/category/${housingId}`)
        };

        dispatch(resetFunctionForMessage());
    },[isErrorForMessage, isSuccessForMessage, messageForMessage, navigate, dispatch, housingId])

    //Filter a correct user by filtering the total array

    let specificUser = users.filter((user) => user._id === landlordId);

    //Set changes for data 
    const handleChange = (e) =>{
        setContactMessage(e.target.value);
    };

    //Set submit for form to send message
    const handleSubmit = (et) => {
        et.preventDefault();


        let inputData = {
            user: landlordId,
            housing: housingId,
            message: contactMessage
        };

        dispatch(addForMessage(inputData));

        setContactMessage("");
    };

    if (isLoadingForMessage) {
        return (<Spinner />)
    };
   
  return (
    <div className='w-10/12 mx-auto mb-40 mt-10'>
        <Link to={`/category/${housingId}`}>
        <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200 mb-5'>
             Back 
        </div>
        </Link>

        <h1 className='text-black font-bold text-3xl'> Contact Landlord </h1>
        {specificUser.map((user) => (
            <h3 key={user._id} className="text-black font-bold mt-5 mb-5 text-xl"> Contact {user.name} </h3>
        ))}
    
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col mb-5'>
                <label htmlFor="message" className='text-black font-bold text-lg mb-3'> Message: </label>
                <textarea name="message" id="message" rows="10" value={contactMessage} onChange={handleChange} className='bg-emerald-400 focus:outline-0 rounded-lg shadow-lg pl-4 text-white'></textarea>
                </div>

                <div className='form-group'>
                    <button type="submit" className='btn btn-lg bg-emerald-400 text-white hover:bg-slate-200 hover:text-emerald-400'> Send Message </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ContactLandlordForm