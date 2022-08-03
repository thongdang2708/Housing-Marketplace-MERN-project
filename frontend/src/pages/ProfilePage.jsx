
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetFunction } from '../features/auth/AuthSlice';
import { logoutUser } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { editInformation } from '../features/auth/AuthSlice';
import { resetEdit } from '../features/auth/AuthSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { updateUserDetails } from '../features/auth/AuthSlice';
import { Link } from 'react-router-dom';
import { displayForHousing } from '../features/housing/HousingSlice';
import SingleHousingAdsByUser from '../components/single displays/SingleHousingAdsByUser';


//Profile Page of Authorized User
function ProfilePage() {

    //Set navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Global State of User

    let {user, editUser} = useSelector(state => state.auth);


    //Global state of housing

    let {housings} = useSelector(state => state.housing);

    //Log Out Function with clicking


    const LogOut = () => {

        dispatch(logoutUser());
        dispatch(resetFunction());
        navigate("/");
    };

    
    //Choose personal information to edit
    const handleChange = () => {
        let editInfo = {
            name: user.name,
            email: user.email,
            token: user.token
        };

        dispatch(editInformation(editInfo));
    }; 

    //Set state for information needed to edit

    let [infoToEdit, setInfoToEdit] = useState({
        name: "",
        email: ""
    })

    //Set effect when clicking to edit

    useEffect(() => {
        if (editUser.edit === true) {
            setInfoToEdit({
                name: editUser.info.name,
                email: editUser.info.email
            })
        }
    },[editUser]);

    //Set changes for data to edit

    const handleChangeEdit = (e) => {

        let {name, value} = e.target;

        setInfoToEdit((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    //Submit to edit

    const submitToEdit = () => {

        let inputData = {
            name: infoToEdit.name,
            email: infoToEdit.email
        };

        dispatch(updateUserDetails(inputData));
        dispatch(resetEdit());
    };

    //Fetch housing ads posted by user with based on using effect of page

    useEffect(() => {
        dispatch(displayForHousing());
    },[])


  return (
    <div className='w-11/12 mx-auto mt-10 mb-40'>
        <div className='flex items-center justify-between mb-12'>
            <div>
                <h1 className='text-black font-bold text-3xl'> My Profile </h1>

            </div>

            <div>
                <p className='p-4 rounded-lg shadow-lg bg-emerald-400 cursor-pointer text-white font-bold hover:bg-slate-200 hover:text-emerald-400' onClick={LogOut}> Log Out! </p>
            </div>
        </div>

        <div className='w-12/12 xl:w-4/12 lg:w-5/12 md:w-6/12'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-black font-bold'> Personal Details </h3>
                </div>

                {editUser.edit === true && editUser.info.token === user.token 
                
                ? 

                <div>
                <p className='text-emerald-400 font-bold cursor-pointer' onClick={submitToEdit}> Done </p>
                </div>

                :

                <div>
                <p className='text-emerald-400 font-bold cursor-pointer' onClick={handleChange}> Change </p>
            </div>
                }
              
            </div>
            
            {editUser.edit === true
            
            ?  
            
            <div className='w-full rounded-md p-4 shadow-lg bg-white mt-5'>
                <input type="text" name="name" id="name" value={infoToEdit.name} onChange={handleChangeEdit} className="input input-sm w-full bg-gray-400 mb-5 focus:outline-0"/>
                <input type="email" name="email" id="email" value={infoToEdit.email} onChange={handleChangeEdit} className="input input-sm w-full bg-gray-400 focus:outline-0"/>
            </div>
            
            : 
            
            <div className='w-full rounded-md p-4 shadow-lg bg-white mt-5'>
                <h3 className='text-xl font-bold text-black mb-4'> {user.name} </h3>
                <p className='text-md font-bold text-gray-400'> {user.email} </p>
            </div>}
            
            <Link to="/updatepassword">
            <p className='my-2 text-emerald-500 font-bold text-xl underline cursor-pointer'> Update Password </p>
            </Link>
            
            <Link to={"/addform"}>
            <div className='w-full rounded-md p-4 shadow-lg bg-emerald-500 mt-5 cursor-pointer'>
                <h4 className='text-center text-white font-bold'> Sell or rent your home! </h4>
            </div>
            </Link>

            <div className='w-full mt-5'>
                <h1 className='font-bold text-black text-xl'> My List </h1>

                <div className='my-5'>
                    {housings.map((housing) => (
                        <SingleHousingAdsByUser key={housing._id} housing={housing}/>
                    ))}
                </div>
            </div>
        </div>

        

    </div>
  )
}

export default ProfilePage