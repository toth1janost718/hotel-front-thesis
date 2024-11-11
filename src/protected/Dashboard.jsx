import React from "react";
import './Dashboard.module.css'
import Sidebar  from "./components/Sidebar/Sidebar.jsx";
import Content from "./components/Content/Content.jsx";

function Dashboard() {
    return (
        <Sidebar/>,
        <Content/>

    )
}

export default Dashboard;