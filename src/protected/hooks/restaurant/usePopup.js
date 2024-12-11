import { useState } from "react";

export const usePopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const openPopup = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return {
        showPopup,
        popupMessage,
        openPopup,
        closePopup,
    };
};
