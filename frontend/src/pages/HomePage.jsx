
import React from 'react';
// import Swiper core and required modules

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import RentImage from "../assets/rent.jpg";
import SellImage from "../assets/sell.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { displayForTopFive } from '../features/housing/HousingSlice';
import {toast} from "react-toastify";
import { useEffect } from 'react';
import SingleRecommendation from '../components/single displays/SingleRecommendation';
import {Link} from "react-router-dom";
import Spinner from '../components/layouts/Spinner';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
//Home Page
function HomePage() {

    //Global state of housing

    let {housings, isError, message, isLoading} = useSelector(state => state.housing);

    //Set dispatch

    let dispatch = useDispatch();

    //Set effect for page to fetch housing details (top 5 latest housing ads)

    useEffect(() => {

        if (isError) {
          toast.error(message);
        }

        dispatch(displayForTopFive());


    },[isError, message]);

  if (isLoading) {
    return (<Spinner />)
  };

  return (
  
    <div className='mb-40 w-11/12 mx-auto mt-6'>
        <h1 className="text-black font-bold text-3xl my-5"> Explore </h1>

        <div className='recommended w-full'>
            <h4 className='text-black font-bold text-xl my-3'> Recommended </h4>

              <Swiper
                slidesPerView={1}
                pagination={{clickable: true}}
              >
              {housings.map((housing) => (
                <SwiperSlide>
                <SingleRecommendation key={housing._id} housing={housing} />
                </SwiperSlide>
              ))}
              </Swiper>

        </div>

        <div className='my-5'>
            <h3 className='text-black font-bold text-2xl mb-5'> Categories </h3>

            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <Link to="/rent">
                    <div className='rounded-lg shadow-lg card h-80 cursor-pointer'>
                      <img src={RentImage} alt="rent" className='inline-block h-80 object-cover bg-cover bg-no-repeat bg-center'/>
                    </div>
                    </Link>
                    <h3 className='text-black font-bold mt-5 text-xl'> Place to rent </h3>
                </div>

                <div>
                  <Link to="/sell">
                    <div className='rounded-lg shadow-lg card h-80 cursor-pointer'>
                      <img src={SellImage} alt="sell" className='inline-block h-80 object-cover bg-cover bg-no-repeat bg-center'/>
                    </div>
                    </Link>
                    <h3 className='text-black font-bold mt-5 text-xl'> Place to sell </h3>
                </div>
            </div>
        </div>
        

    </div>

        
 
   

  )
}

export default HomePage