
import axios from "axios";

const API_URL = "/api/housing/";

// Create housing with authorized user

const addHousing = async (formData, token) => {


    let config = {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }
    };

    let response = await axios.post(API_URL, formData, config);

    return response.data;
};

//Get housing ads with authorized user

const displayHousing = async (token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };


    let response = await axios.get(API_URL, config);

    return response.data

};

//Delete housing ads with authorized user

const deleteHousing = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.delete(API_URL + id, config);

    return response.data
};


//Display top 5 latest housing ads

const displayTopFive = async () => {

    let response = await axios.get(API_URL + "topfive");

    return response.data;
};


//Display rent housing ads

const displayRent = async () => {

    let response = await axios.get(API_URL + "rent");

    return response.data;
};

//Display sell housing ads

const displaySell = async () => {

    let response = await axios.get(API_URL + "sell");

    return response.data;
};

//Display housing ads with offer


const displayOffer = async () => {
    
    let response = await axios.get(API_URL + "offers");

    return response.data
};



//Get full housing ads with authorization

const getFull = async () => {
    
    let response = await axios.get(API_URL + "full");

    return response.data;
};


const HousingService = {
    addHousing,
    displayHousing,
    deleteHousing,
    displayTopFive,
    displayRent,
    displaySell,
    displayOffer,
    getFull
};

export default HousingService;