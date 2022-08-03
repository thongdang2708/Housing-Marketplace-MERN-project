
import React from 'react';
import {MdOutlineLocalOffer, MdOutlineExplore} from "react-icons/md";
import {AiOutlineUser} from "react-icons/ai";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Navbar() {

    let location = useLocation();

    const pathRoute = (route) => {

        if (route === location.pathname) {
          return true;
        }
    }


  return (
    <div className='fixed bottom-0 w-full bg-emerald-400 p-7 z-30'>
        <div className='w-10/12 mx-auto flex items-center justify-between'>
          <Link to="/">
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <div>
              <MdOutlineExplore size={40} className={pathRoute("/") ? "inline-block text-black font-bold" : "inline-block"}/>
            </div>

            <div>
              <h3 className={pathRoute("/") ? 'text-black font-bold text-xl mt-4' : 'text-black text-xl mt-4'}> Explore </h3>
            </div>
          </div>
          </Link>

          <Link to="/offer">
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <div>
              <MdOutlineLocalOffer size={40} className={pathRoute("/offer") ? "inline-block text-black font-bold" : "inline-block"}/>
            </div> 

            <div>
              <h3 className={pathRoute("/offer") ? 'text-black font-bold text-xl mt-4' : 'text-black text-xl mt-4'}> Offer </h3>
            </div>
          </div>  
          </Link>

          <Link to="/profile">
          <div className='flex flex-col items-center justify-center cursor-pointer'>
            <div>
              <AiOutlineUser size={40} className={pathRoute("/profile") ? "inline-block text-black font-bold" : "inline-block"}/>
            </div>

            <div>
              <h3 className={pathRoute("/profile") ? 'text-black font-bold text-xl mt-4' : 'text-black text-xl mt-4'}> Profile </h3>
            </div>
          </div>  
          </Link>
        </div>
    </div>
  )
}

export default Navbar