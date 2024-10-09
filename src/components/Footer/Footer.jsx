import React from 'react';
import footerCSS  from './../Footer/Footer.module.css'
import NavItem from "../NavItem/NavItem.jsx";


function Footer() {
    return (

        <footer className={`${footerCSS.footer_wrapper} section`}>
            <div className={footerCSS.footerLinks}>
                <div className={footerCSS.logo}>
                    <h2>Moonlight Valley Hotel ****</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium corporis deserunt
                        distinctio fuga iure mollitia nesciunt omnis sapiente veniam! Quidem.</p>
                </div>
            </div>
            <div className={footerCSS.footerLinks}>
                <h3>Gyorslinkek</h3>
                <p>Rólunk</p>
                <p>Kapcsolat</p>
                <p>Szobák</p>
                <p>Étterem</p>
                <NavItem label="Belépés" to="/login" />

            </div>
            <div className={footerCSS.footerLinks}>
                <h3>Kapcsolat</h3>
                <p>Cím: <span>1011 Budapest Normafa tér 1</span></p>
                <p>Email: <span>recepcio@moonlighthotel.hu</span></p>
                <p>Telefonszám: <span>30-123-4578</span></p>

            </div>

        </footer>
    )
}

export default Footer;