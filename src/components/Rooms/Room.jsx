import React from 'react';
import roomCss from './../Rooms/Room.module.css';
import aboutCSS from "../About/About.module.css";

function Room() {
    return (
        <div className={`${roomCss.rooms_container} section`}>
            <small className="section_header"> Luxus szobák</small>
            <h2 className="section_title">A legjobb <span>szobáink</span></h2>
            <div className={roomCss.cards}>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front1}`}>
                            <button>Junior Suite</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back1}`}>
                            <div className={roomCss.price}>
                                <p>34.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Junior Suite</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front2}`}>
                            <button>Kétágyas szoba</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back2}`}>
                            <div className={roomCss.price}>
                                <p>42.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Kétágyas szoba</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front2}`}>
                            <button>Családi szoba</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back2}`}>
                            <div className={roomCss.price}>
                                <p>34.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Családi szoba</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front3}`}>
                            <button>Superior kétszemélyes</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back3}`}>
                            <div className={roomCss.price}>
                                <p>58.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Superior kétszemélyes</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front4}`}>
                            <button>Superior Családi szoba</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back4}`}>
                            <div className={roomCss.price}>
                                <p>34.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Superior Családi szoba</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={roomCss.card_container}>
                    <div className={roomCss.card}>
                        <div className={`${roomCss.card_front} ${roomCss.card_front5}`}>
                            <button>Lakosztály</button>
                        </div>
                        <div className={`${roomCss.card_back} ${roomCss.card_back5}`}>
                            <div className={roomCss.price}>
                                <p>80.000 Ft</p>
                            </div>
                            <div className={roomCss.card_content}>
                                <h3>Lakosztály</h3>
                                <p>Napi takarítás</p>
                                <p>Minibár</p>
                                <p>Szobaszervíz</p>
                                <p>Wifi</p>
                            </div>
                            <div className={roomCss.bookNow}>
                                <button>Foglalás</button>
                                <i className="ri-arrow-right-line"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;