
import React from 'react';
import PropTypes from 'prop-types'

function SingleImage({image}) {
  return (
    <div className='w-full h-full'>
        <img src={image} alt="image" className='inline-block w-full h-96 object-cover bg-center bg-no-repeat bg-cover'/>
    </div>
  )
};

SingleImage.propTypes = {
    image: PropTypes.string.isRequired
};

export default SingleImage