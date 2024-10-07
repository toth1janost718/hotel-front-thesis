import React from "react";
import servicesCSS from './../Services/Services.module.css'

function Services() {
    return (
        <div className={`${servicesCSS.service_wrapper} section`}>
            <small className="section_header">Felszereltség</small>
            <h2 className="section_title">A legjobb <span>szolgáltatásaink </span> </h2>

            <div className={servicesCSS.services_cards}>
                <div className={servicesCSS.service_card}>
                    <i className="ri-hotel-line"></i>
                    <h3>Alapszolgáltatásaink</h3>
                    <p>Recepció</p>
                    <p>Szobaszervíz</p>
                    <p>Takarító szolgálat</p>
                    <p>Ingyenes Wifi & parkolás</p>
                </div>
                <div className={servicesCSS.service_card}>
                    <i className="ri-hotel-bed-line"></i>
                    <h3>Szoba felszereltség</h3>
                    <p>Komfortos Franciágy</p>
                    <p>Hálószoba és fürdő</p>
                    <p>Okostévé és Wifi</p>
                    <p>Minibár</p>
                </div>
                <div className={servicesCSS.service_card}>
                    <i className="ri-goblet-line"></i>
                    <h3>Szoba felszereltség</h3>
                    <p>Komfortos Franciágy</p>
                    <p>Hálószoba és fürdő</p>
                    <p>Okostévé és Wifi</p>
                    <p>Minibár</p>
                </div>

            </div>
        </div>
    )
}

export default Services;