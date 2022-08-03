
import axios from "axios";

const API_URL = "/api/message/";

//Add Message

const addMessage = async (inputData) => {

    let response = await axios.post(API_URL, inputData);

    return response.data;
    
};

const MessageService = {
    addMessage
};

export default MessageService