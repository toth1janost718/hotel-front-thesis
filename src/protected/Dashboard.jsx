import React, {useEffect} from "react";
import './Dashboard.module.css'

import Sidebar  from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content/Content.jsx";

function Dashboard() {

        useEffect(() => {
            import('bootstrap/dist/css/bootstrap.min.css');
        }, []);
    return (
        <div className="dashboard">
            <Sidebar />
            <Content />
        </div>

    )
}

export default Dashboard;