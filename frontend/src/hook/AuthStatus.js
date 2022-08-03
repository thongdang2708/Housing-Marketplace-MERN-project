
import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

export const authStatus = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    let [checkStatus, setCheckStatus] = useState(true);

    let {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false);
        }

        setCheckStatus(false);
    }, [user]);

    return {loggedIn, checkStatus};
};