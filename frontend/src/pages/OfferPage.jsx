

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { displayForOffers } from '../features/housing/HousingSlice';
import {useState, useEffect} from "react";
import SinglePublicHousingAds from '../components/single displays/SinglePublicHousingAds';
import {toast} from "react-toastify";
import Spinner from '../components/layouts/Spinner';


//Page with offers
function OfferPage() {
     //Global state of housing
     let {housings, isError, message, isLoading} = useSelector(state => state.housing);

     //Set dispatch
     let dispatch = useDispatch();
 
     //Set effect to fetch sell housing ads
 
     useEffect(() => {
         if (isError) {
             toast.error(message);
         }
 
         dispatch(displayForOffers());
     },[isError, message])
 
     //Set a number of housing ads displayed
 
     let [currentNumber, setCurrentNumber] = useState(1);
     let [postsDisplay, setPostsDisplay] = useState(2);
 
     let endIndex = currentNumber * postsDisplay;
     let displayHousings = housings.slice(0, endIndex);
 
     //Set click button to load more
 
     const handleClick = () => {
 
         currentNumber++;
         setCurrentNumber(currentNumber);
     };
 
     if (isLoading) {
         return (<Spinner />)
     };

     return (
      <div className='w-11/12 mx-auto mt-10 mb-40'>
  
      <h1 className="text-black font-bold text-3xl"> Offers </h1>
  
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

export default OfferPage