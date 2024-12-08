import  {useEffect} from "react";
import './Dashboard.module.css'

import Sidebar  from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content/Content.jsx";
import {useNavigate} from "react-router-dom";


function Dashboard() {

    const navigate = useNavigate();

    useEffect(() => {
        import('bootstrap/dist/css/bootstrap.min.css'); // Bootstrap betöltése
        navigate('/foglalas'); // Automatikus átirányítás a /foglalas útvonalra
    }, [navigate]);
    return (
        <div className="dashboard">
            <Sidebar/>
            <Content/>

        </div>

    )
}

export default Dashboard;