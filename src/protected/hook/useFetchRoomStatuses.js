import { useState, useEffect } from "react";
import { fetchRoomStatuses } from "../api/bookingApi";

const useFetchRoomStatuses = (date) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRoomStatuses = async () => {
            setLoading(true);
            try {
                const formattedDate = date.toISOString().split("T")[0];
                const data = await fetchRoomStatuses(formattedDate);
                setRooms(data);
            } catch (err) {
                setError(err.message || "Hiba történt az API hívás során.");
            } finally {
                setLoading(false);
            }
        };

        getRoomStatuses();
    }, [date]);

    return { rooms, loading, error };
};

export default useFetchRoomStatuses;
