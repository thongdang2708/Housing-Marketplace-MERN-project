
import React from 'react';
import PropTypes from 'prop-types';
import {FaBed, FaBath} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SinglePublicHousingAds({housing}) {

    //Get first index image

    let firstIndexImage = housing.images.slice(-1);

    let navigate = useNavigate();


  return (
    
    <div className='w-full rounded-lg shadow-lg bg-white grid grid-cols-2 relative mb-10 cursor-pointer' onClick={() => navigate(`/category/${housing._id}`)}>
        <div className='rounded-lg shadow-lg card h-full relative'>
            <img src={firstIndexImage[0]} alt="housing-image" className='inline-block object-cover bg-center bg-repeat bg-cover h-44' />

            <div className='card-body absolute top-0 left-0 w-full h-full flex flex-col justify-around'>
                <div>
                </div>


                <div className='left-2 absolute bottom-2'>
                    <h3 className='text-white'> {housing.name}</h3>
                </div>
            </div>
        </div>

        <div className='ml-6'>
        
            <h4 className='text-lg font-bold text-black mt-2'> {housing.address} </h4>

            <h5 className='text-md font-bold text-emerald-500 mt-2'>  {housing.selection === "rent" ? `${housing.price} $/month` : `${housing.price} $/house`}         </h5>

            <p className='mb-2'> <FaBed className='inline-block' size={22}/> {housing.bedRooms === 1 ? `${housing.bedRooms} Bed Room` : `${housing.bedRooms} Bed Rooms`} </p>
            <p> <FaBath className='inline-block mb-2' size={18} /> {housing.bathRooms === 1 ? `${housing.bathRooms} Bath Room` : `${housing.bathRooms} Bath Rooms`} </p>
        </div>


        

    </div>
  
  )
};

SinglePublicHousingAds.propTypes = {
    housing: PropTypes.object.isRequired
};

export default SinglePublicHousingAds