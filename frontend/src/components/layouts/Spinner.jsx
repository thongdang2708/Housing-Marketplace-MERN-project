
import React from 'react';
import Loading from "../../assets/loading.gif"

function Spinner() {
  return (
    <div className='w-100 text-center'>
        <img src={Loading} alt="loading" className='inline-block text-center' width={180}/>
    </div>  
  )
}

export default Spinner