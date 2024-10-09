import React from 'react';
import feedbackCSS from './../Feedbacks/Feedback.module.css'
import {Swiper,SwiperSlide} from "swiper/react";
import 'swiper/css'
import {Autoplay} from "swiper/modules";

import  feedbackl_client1 from "../../assets/img/testimonials_front/client1.jpg"
import  feedback_client2 from "../../assets/img/testimonials_front/client2.jpg"
import  feedback_client3 from "../../assets/img/testimonials_front/client3.jpg"
import  feedback_client4 from "../../assets/img/testimonials_front/client4.jpg"


function Feedback() {
    return (
        <div className={`${feedbackCSS.feedback_wrapper} section`}>
            <small className="section_header">Visszajelzések</small>
            <h2 className="section_title"><span> Ügyfeleink </span>visszajelzései</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={
                    {delay: 1000,
                    }}
                breakpoints={{
                    0:{slidesPerView:1},
                    1200:{slidesPerView:2},
                }}
                speed={1500}
                modules={[Autoplay]}
                className={feedbackCSS.swiper}>
                <SwiperSlide>
                    <div className={feedbackCSS.feedback}></div>
                    <img src={feedbackl_client1} alt=""/>
                    <div className={feedbackCSS.content}>
                        <h3> Német Ábel<span></span></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque, cupiditate harum impedit iste nulla optio rem sint tempore unde!
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={feedbackCSS.feedback}></div>
                    <img src={feedback_client2} />
                    <div className={feedbackCSS.content}>
                        <h3> Nagy Attila<span></span></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque, cupiditate harum impedit iste nulla optio rem sint tempore unde!
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={feedbackCSS.feedback}></div>
                    <img src={feedback_client3} />
                    <div className={feedbackCSS.content}>
                        <h3>Teszt Anita <span></span></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque, cupiditate harum impedit iste nulla optio rem sint tempore unde!
                        </p>
                    </div>


                </SwiperSlide>
                <SwiperSlide>
                    <div className={feedbackCSS.feedback}></div>
                    <img src={feedback_client4} />
                    <div className={feedbackCSS.content}>
                        <h3> Teszt Vanda<span></span></h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque, cupiditate harum impedit iste nulla optio rem sint tempore unde!
                        </p>
                    </div>


                </SwiperSlide>

            </Swiper>
        </div>


)
}

export default Feedback;