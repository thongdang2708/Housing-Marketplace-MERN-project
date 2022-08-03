
import React from 'react';
import PropTypes from 'prop-types'

function SingleRecommendation({housing}) {

    //Find index of image
    let firstIndexImage = housing.images.slice(-1);



  return (
    <div className='w-full relative h-full'>
        <img src={firstIndexImage[0]} alt="housing" className='inline-block w-full h-96 object-cover bg-center bg-no-repeat bg-cover'/>

        <div className='absolute top-0 left-0 w-full h-full page'>
            <div className='housename absolute left-0 bg-black p-5'>
                <h2 className='text-white font-bold uppercase'> {housing.name} </h2>
            </div>

            <div className='houseselection absolute bg-black p-2'>
                <p className='text-white'> House for {housing.selection} </p>
            </div>

            <div className='houseprice absolute bg-black p-2'>
                <p className='text-white'> {housing.selection === "rent" ? `Rental Price: ${housing.price} $/month` : `Selling Price: ${housing.price} $/house`} </p>
            </div>


        </div>
    </div>
  )
};

SingleRecommendation.propTypes = {
    housing: PropTypes.object.isRequired
};

export default SingleRecommendation