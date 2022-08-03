
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getForFull } from '../features/housing/HousingSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleImage from "../components/single displays/SingleImage";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Spinner from '../components/layouts/Spinner';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

//Page to display housing ad
function SinglePageDisplay() {

    //Set dispatch
    let dispatch = useDispatch();


    //Global state of housing
    let {housings, isLoading} = useSelector(state => state.housing);

    //Set param
    let params = useParams();

    //Set effect for page to fetch housing details
    useEffect(() => {
        dispatch(getForFull());
    },[])
    

    //Set single housing ad by filtering it with the total housing ads and keep it still in an array
 
    let singleHousing = housings.filter((housing) => housing._id === params.housingId);


    //Validate routes to go back to the previous page

    const validateRoutes = (selection) => {

        if (selection === "sell") {
            return "/sell"
        };

        if (selection  === "rent") {
            return "/rent"
        };
    };



    if (isLoading) {
        return (<Spinner />)
    }


  return (
    <>
    <div className='mb-40'>
    {singleHousing.map((housing) => (
            <>
            <div className='w-full'>
                <Swiper
                slidesPerView={1}
                pagination={{clickable: true}}
                >
                    {housing.images.map((image, index) => (
                        <SwiperSlide>
                        <SingleImage key={index} image={image}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div> 
            
            <div className='w-11/12 mx-auto mt-5'>
            <Link to={validateRoutes(housing.selection)}>
            <div className='btn btn-lg bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200 mb-5'>
                {housing.selection === "sell" ? "To Sell List" : "To Rent List"}
            </div>
            </Link>
            <h1 className='text-black font-bold text-3xl mb-3'> {housing.name} - {housing.selection === "rent" ? `${housing.price} $/month` : `${housing.price} $/house`}</h1>
            <h3 className='text-xl font-bold text-black'> {housing.location.formattedAddress}</h3>

            <div>
                {housing.selection === "rent" ? <div className='badge badge-primary text-white font-bold mr-5'> For Rent </div> : <div className='badge badge-warning text-white font-bold mr-5'> For Sell </div>}
                {housing.discountPrice > 0 && <div className='badge badge-success text-white font-bold'> ${housing.discountPrice} discount </div>}
            </div>

            <p className="my-3"> {housing.bedRooms > 1 ? `${housing.bedRooms} Bed Rooms` : `${housing.bedRooms} Bed Room`}</p>
            <p className='mb-3'> {housing.bathRooms > 1 ? `${housing.bathRooms} Bath Rooms` : `${housing.bathRooms} Bath Room`}</p>
            {housing.parkingSpot && <p className='mb-3'> Parking Spot Available </p>}
            {housing.furnished && <p className='mb-3'> Furnished Available </p>}

            <h3 className='text-black font-bold text-xl'> Location </h3>

            <div className='mb-20'>
            <MapContainer center={[housing.location.coordinates[0], housing.location.coordinates[1]]} className="map" style={{height: "300px", width: "100%"}}zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[housing.location.coordinates[0], housing.location.coordinates[1]]} >
                <Popup>
                    {housing.location.formattedAddress}
                </Popup>
                </Marker>
            </MapContainer>
            </div>
            
            <Link to={`/contactlandlord?landlord=${housing.user}&housing=${housing._id}`}>
            <div>
                <div className='btn btn-lg w-full bg-emerald-400 text-white hover:text-emerald-400 hover:bg-slate-200'> Contact Landlord </div>
            </div>
            </Link>        
        </div>
        </>
    ))}

       
    </div>
    </>
  )
}

export default SinglePageDisplay