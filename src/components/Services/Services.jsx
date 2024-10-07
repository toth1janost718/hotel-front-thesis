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
                    <h3>Alap szolgáltatásaink</h3>
                    <p>Recepció</p>
                    <p>Szobaszervíz</p>
                    <p>Takarító szolgálat</p>
                    <p>Ingyenes Wifi & parkolás</p>
                </div>
                <div className={servicesCSS.service_card}>
                    <i className="ri-hotel-bed-line"></i>
                    <h3>Szoba felszereltség</h3>
                    <p>Franciágy</p>
                    <p>Hálószoba és fürdő</p>
                    <p>Okostévé és Wifi</p>
                    <p>Minibár</p>
                </div>
                <div className={servicesCSS.service_card}>
                    <i className="ri-goblet-line"></i>
                    <h3>Étkezési lehetőségek</h3>
                    <p>Étterem</p>
                    <p>Bár</p>
                    <p>Kávézó</p>
                    <p>Szobaszervíz</p>
                </div>
                <div className={servicesCSS.service_card}>
                    <i className="ri-restaurant-line"></i>
                    <h3>Speciális szolgáltatások</h3>
                    <p>Edzőterem</p>
                    <p>Uszoda</p>
                    <p>Tenniszpálya</p>

                </div>

            </div>
        </div>
    )
}

export default Services;