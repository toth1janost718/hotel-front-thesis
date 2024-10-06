import React from "react";
import aboutCSS from './../About/About.module.css'

import aboutImg from './../../assets/img/about_front/about_img.png'

function About() {
    return (
        <div className={`${aboutCSS.about_wrapper} section`}>
            <div className={aboutCSS.about_img}>
                <img src={aboutImg} alt="" className={aboutCSS.about_pict}/>
            </div>
            <div className={aboutCSS.about_content}>
                <small className="section_header">Moonlight Valley Hotel </small>
                <h2 className="section_title">Ahol a minőség és az <span>Elegancia </span> találkozik!</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid aspernatur cupiditate
                    dolores ducimus, facere fugiat itaque laudantium magnam, maiores perspiciatis quia, veritatis vitae
                    voluptatibus.</p>
                <div className={aboutCSS.Card}>
                    <p>98%<span>Vendégelégedettség</span></p>
                    <p>2023<span> Az év szálláshelye</span></p>
                    <p>2022<span> Az év konferenciahelyszíne</span></p>


                </div>
            </div>
        </div>
    )
}

export default About;