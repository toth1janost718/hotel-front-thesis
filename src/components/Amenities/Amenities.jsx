import React from "react";
import amenitiesCSS from './../Amenities/Amenities.module.css'
import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css'
import {Autoplay} from "swiper/modules";

import amenities_spa from './../../assets/img/amenities_front/amenities_spa.jpg'
import amenities_gym from './../../assets/img/amenities_front/amenities_gym.jpg'
import amenities_wellness from './../../assets/img/amenities_front/amenities_wellness.jpg'

function Amenities() {
    return (
        <div className={`${amenitiesCSS.amenities_wrapper} section`}>
            <small className="section_header">Kényeztetés luxusban</small>
            <h2 className="section_title">A legjobb beltéri <span> felszereltségeink </span></h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={
                {delay: 1000,
                }}
                speed={2000}
                modules={[Autoplay]}
                className={amenitiesCSS.swiper}>
                <SwiperSlide>
                    <div className={amenitiesCSS.amenities_item}>
                        <img src={amenities_spa}/>
                        <div className={amenitiesCSS.content}>
                            <h2>Belső medence</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur corporis doloribus ea facilis fugiat, impedit incidunt obcaecati optio porro repellat similique sunt veritatis, voluptates!</p>
                            <button>Foglaljon most!</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={amenitiesCSS.amenities_item}>
                        <img src={amenities_gym}/>
                        <div className={amenitiesCSS.content}>
                            <h2>Modern edzőterem</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur corporis doloribus ea facilis fugiat, impedit incidunt obcaecati optio porro repellat similique sunt veritatis, voluptates!</p>
                            <button>Foglaljon most!</button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={amenitiesCSS.amenities_item}>
                        <img src={amenities_wellness}/>
                        <div className={amenitiesCSS.content}>
                            <h2>Szauna</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae consectetur corporis doloribus ea facilis fugiat, impedit incidunt obcaecati optio porro repellat similique sunt veritatis, voluptates!</p>
                            <button>Foglaljon most!</button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </div>
    )
}

export default Amenities;