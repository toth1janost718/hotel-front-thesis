import React from 'react';
import headerCSS from'./../Header/Header.module.css'
import {Swiper,SwiperSlide} from "swiper/react";
import { Autoplay , Parallax} from "swiper/modules";
import 'swiper/css'

function Header() {
    return (
        <div className={headerCSS.header_wrapper}>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                className={headerCSS.swiper}
                autoplay={{
                    delay: 2500,
                }}
                parallax={true}
                speed={1500}
                modules={[Autoplay, Parallax]}

            >
                <SwiperSlide>
                    <div className={`${headerCSS.Header_slide}  ${headerCSS.slide1}`}>
                        <div className={headerCSS.content}>
                            <small data-swiper-parallax="-200">Moonlight Valley Hotel ****</small>
                            <h2 data-swiper-parallax="-400">Élje át az erdő <span>varázsát</span> <br/>
                                minden <span>kényelemmel</span>
                            </h2>
                            <p data-swiper-parallax="-600">Foglaljon most <span>06-30-1234567</span></p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${headerCSS.Header_slide} ${headerCSS.slide2}`}>
                        <div className={headerCSS.content}>
                            <small data-swiper-parallax="-200">Moonlight Valley Hotel ****</small>
                            <h2 data-swiper-parallax="-400">Élje át az erdő <span>varázsát</span> <br/>
                                minden <span>kényelemmel</span>
                            </h2>
                            <p data-swiper-parallax="-600">Foglaljon most <span>06-30-1234567</span></p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`${headerCSS.Header_slide} ${headerCSS.slide3}`}>
                        <div className={headerCSS.content}>
                            <small data-swiper-parallax="-200">Moonlight Valley Hotel ****</small>
                            <h2 data-swiper-parallax="-400">Élje át az erdő <span>varázsát</span> <br/>
                                minden <span>kényelemmel</span>
                            </h2>
                            <p data-swiper-parallax="-600">Foglaljon most <span>06-30-1234567</span></p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Header;