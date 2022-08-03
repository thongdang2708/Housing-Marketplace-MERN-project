
import React from 'react';
import { useState } from 'react';
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import { createHousing } from '../features/housing/HousingSlice';
import { resetFunctionForHousing } from '../features/housing/HousingSlice';
import Spinner from '../components/layouts/Spinner';
import { Link } from 'react-router-dom';
//Create Housing Ads Form

function AddForm() {

  //Set State for Form
  let [name, setName] = useState("");
  let [selection, setSelection] = useState("rent");
  let [bedRooms, setBedRooms] = useState(0);
  let [bathRooms, setBathRooms] = useState(0);
  let [parkingSpot, setParkingSpot] = useState(false);
  let [furnished, setFurnished] = useState(false);
  let [address, setAddress] = useState("");
  let [offer, setOffer] = useState(false);
  let [price, setPrice] = useState(0);
  let [arrayFile, setArrayFile] = useState([]);
  let [discountPrice, setDiscountedPrice] = useState(0);
  

  //Set navigate and dispatch
  
  let navigate = useNavigate();
  let dispatch = useDispatch();


  //Global state of housing

  let {isSuccess, isError, isLoading, message} = useSelector(state => state.housing); 

  //Set effect for page

  useEffect(() => {

      if (isError) {
         toast.error(message)
      };

      if (isSuccess) {
        toast.success("Housing ads saved!");
        navigate("/profile");
      };

      dispatch(resetFunctionForHousing());
  },[isError, isSuccess, message, dispatch, navigate]);



  //Set Changes for Image
  const handleImage = (e) => {

    if (e.target.files[0] !== undefined) {
      setArrayFile((prevState) => {
        return [e.target.files[0], ...prevState]
    });
    }
   
  };

  

  //Submit to create housing

  const handleSubmit = (e) => {

      e.preventDefault();

      let formData = new FormData();

      arrayFile.forEach((item) => {
          formData.append("file", item)
      });

      let inputData = {
        name,
        selection,
        bedRooms: Number(bedRooms),
        bathRooms: Number(bathRooms),
        parkingSpot,
        furnished,
        address,
        offer,
        price: Number(price),
        discountPrice: Number(discountPrice)
      }

      formData.append("body", JSON.stringify(inputData));

      dispatch(createHousing(formData));

      setName("");
      setSelection("");
      setBedRooms(0);
      setBathRooms(0);
      setParkingSpot(false);
      setFurnished(false);
      setAddress("");
      setOffer(false);
      setPrice(0);
      setDiscountedPrice(0);


  };

  if (isLoading) {
    return (<Spinner />);
  }


  return (
    <div className='w-10/12 mx-auto mb-40 mt-10'>

        <Link to="/profile">
        <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200 mb-5'>
            Back 
        </div>
        </Link>


      <h1 className='text-3xl text-black font-bold mb-4'> Create a listing! </h1>

      <div className='form'>
          <form onSubmit={handleSubmit}>  
              <div className='form-group'>
                  <h3 className='text-bold font-black'> Sell / Rent </h3>

                  <div className='flex items-center my-4'>
                      <div onClick={() => setSelection("sell")} className={selection === "sell" ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44"}>
                        Sell
                      </div>

                      <div onClick={() => setSelection("rent")}className={selection === "rent" ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200"}>
                        Rent
                      </div>
                  </div>

              </div>

              

              <div className='form-group mb-5 flex flex-col'>
                  <label htmlFor="name" className='text-bold font-black'> Name </label>
                  <input type="text" name="name" id="name" className=' input input-md w-10/12 xl:w-3/12 lg:w-4/12 md:w-6/12 bg-slate-200 focus:outline-0' value={name} onChange={(e) => setName(e.target.value)}/>
              </div>

              <div className='form-group flex mb-5'>
                <div className='flex flex-col mr-16'>
                  <label htmlFor="bedRooms" className='text-bold font-black'> Bed Rooms </label>
                  <input type="number" name="bedRooms" id="bedRooms" value={bedRooms} onChange={(e) => setBedRooms(e.target.value)} className='input input-sm bg-white w-5/12 text-black focus:outline-0' min={"0"}/>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor="bathRooms" className='text-bold font-black'> Bath Rooms </label>
                  <input type="number" name="bathRooms" id="bathRooms" value={bathRooms} onChange={(e) => setBathRooms(e.target.value)} className='input input-sm bg-white w-5/12 text-black focus:outline-0' min={"0"}/>
                </div>
              </div>

              <div className='form-group'>
                  <h3 className='text-bold font-black'> Parking Spot </h3>

                  <div className='flex items-center my-4'>
                      <div onClick={() => setParkingSpot(true)} className={parkingSpot ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44"}>
                        Yes
                      </div>

                      <div onClick={() => setParkingSpot(false)} className={!parkingSpot ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200"}>
                        No
                      </div>
                  </div>

              </div>

              <div className='form-group'>
                  <h3 className='text-bold font-black'> Furnished </h3>

                  <div className='flex items-center my-4'>
                      <div onClick={() => setFurnished(true)} className={furnished ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44"}>
                        Yes
                      </div>

                      <div onClick={() => setFurnished(false)} className={!furnished ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200"}>
                        No
                      </div>
                  </div>

              </div>

              <div className='form-group'>
              <h3 className='text-bold font-black mb-4'> Address </h3>
              <p className='mb-5 text-md text-black font-bold'> (Please fill with lower case: Street Number + Street Name + City)</p>
              <textarea name="address" id="address" rows="10" className='w-10/12 xl:w-3/12 lg:w-4/12 md:w-6/12 bg-slate-200 focus:outline-0 pl-2' onChange={(e) => setAddress(e.target.value)}></textarea>
              </div>

              <div className='form-group'>
                  <h3 className='text-bold font-black'> Offer </h3>

                  <div className='flex items-center my-4'>
                      <div onClick={() => setOffer(true)} className={offer ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200 mr-44"}>
                        Yes
                      </div>

                      <div onClick={() => setOffer(false)} className={!offer ? "sell btn btn-md text-white bg-emerald-400 focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200" : "sell btn btn-md bg-white text-black focus:outline-0 rounded-lg shadow-lg hover:bg-slate-200"}>
                        No
                      </div>
                  </div>

              </div>

              <div className='form-group flex mb-5'>
                <div className='flex flex-col mb-5'>
                  <label htmlFor="price" className='text-bold font-black'> {selection === "rent" ? "Regular Price ($/month)" : "Regular Price ($/house)"}</label>
                  <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className='input input-sm bg-white w-5/12 text-black focus:outline-0' min={"0"}/>
                </div>
                </div>

                {offer && (
                  <div className='form-group flex mb-5'>
                  <div className='flex flex-col mb-5'>
                    <label htmlFor="discountPrice" className='text-bold font-black'> {selection === "rent" ? "Discounted Price ($/month)" : "Discounted Price ($/house)"} </label>
                    <input type="number" name="discountPrice" id="discountPrice" value={discountPrice} onChange={(e) => setDiscountedPrice(e.target.value)} className='input input-sm bg-white w-5/12 text-black focus:outline-0' min={"0"}/>
                  </div>
                  </div>
                )}
                

                <div className='form-group mb-5'>
                    <input type="file" name="file" id="file" className='hidden w-fulls' onChange={handleImage}/>
                    <label htmlFor="file" className='p-3 bg-emerald-400 rounded-lg shadow-lg cursor-pointer mr-6'> Choose File </label>
                    <label className='text-emerald-400 font-bold'> {arrayFile.length <= 1 ? `${arrayFile.length} file` : `${arrayFile.length} files`}  </label>
                </div>

                <div className='form-group w-full my-2'>
                    <button type="submit" className='btn btn-lg bg-emerald-400 w-full mt-4 hover:bg-slate-200 hover:text-emerald-400 text-white'> Create Housing Ads </button>
                </div>

          </form>
      </div>
    </div>
  )
}

export default AddForm