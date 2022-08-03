
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayForRent } from '../features/housing/HousingSlice';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify";
import SinglePublicHousingAds from '../components/single displays/SinglePublicHousingAds';
import { useState } from 'react';
import Spinner from '../components/layouts/Spinner';

//Page for rent
function RentPage() {

    //Global state of housings
    let {housings, isError, message, isLoading} = useSelector(state => state.housing);
    
    //Set dispatch
    let dispatch = useDispatch();

    //Set effect for page

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(displayForRent());
    },[isError, message]);

    //Set a number of listed items displayed on a page
    let [currentNumber, setCurrentNumber] = useState(1);
    let [postsDisplay, setPostsDisplay] = useState(2);

   let endIndex = currentNumber * postsDisplay;

   let displayHousings = housings.slice(0, endIndex);

   //Handle click to load more
   const handleClick = () => {
    
        currentNumber++;
        setCurrentNumber(currentNumber);
   };

   
   if (isLoading) {
       return (<Spinner />)
   };

  return (
    <div className='w-11/12 mx-auto mt-10 mb-40'>

        <Link to="/">
        <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200 mb-5'>
            Back 
        </div>
        </Link>
        <h1 className="text-black font-bold text-3xl"> Place to rent </h1>

        <div className='w-12/12 xl:w-6/12 lg:w-7/12 md:w-8/12 p-4'>
            {displayHousings.map((housing) => (
                <SinglePublicHousingAds key={housing._id} housing={housing} />
            ))}


        {endIndex >= housings.length 
        
        ? 
        
        "" 
        
        : 
        
        (
            <div className='text-center'>
            <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200' onClick={handleClick}>
                Load More
            </div>
            </div>
        
        )}
        </div>

                
    </div>
  )
}

export default RentPage