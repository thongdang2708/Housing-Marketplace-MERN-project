
import React from 'react';
import PropTypes from 'prop-types';
import {FaBed, FaBath, FaTimes} from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { deleteForHousing } from '../../features/housing/HousingSlice';


function SingleHousingAdsByUser({housing}) {


    //Set Dispatch

    let dispatch = useDispatch();

    //Delete function

    const handleDelete = (id) => {

        dispatch(deleteForHousing(id));
    };

    //Find first index of images
    let firstIndexImage = housing.images.slice(-1);
    



  return (
    <div className='mb-14 w-full rounded-lg shadow-lg bg-white grid grid-cols-2 relative'>
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

            <h5 className='text-md font-bold text-emerald-500 mt-2'>   {housing.selection === "rent" ? `${housing.price} $/month` : `${housing.price} $/house`}         </h5>

            <p className='mb-2'> <FaBed className='inline-block' size={22}/> {housing.bedRooms === 1 ? `${housing.bedRooms} Bed Room` : `${housing.bedRooms} Bed Rooms`} </p>
            <p> <FaBath className='inline-block mb-2' size={18} /> {housing.bathRooms === 1 ? `${housing.bathRooms} Bath Room` : `${housing.bathRooms} Bath Rooms`} </p>
        </div>


        <div className='button absolute right-0 -top-6 cursor-pointer' onClick={() => handleDelete(housing._id)}>
            <div className="p-1 bg-red-300">
                <FaTimes />
            </div>
        </div>

        

    </div>
  )
};

SingleHousingAdsByUser.propTypes = {
    housing: PropTypes.object.isRequired
};

export default SingleHousingAdsByUser