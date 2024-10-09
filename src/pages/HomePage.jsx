import React from 'react';
import Nav from '../components/Nav/Nav.jsx';
import Header from '../components/Header/Header.jsx';
import About from '../components/About/About.jsx';
import Services from '../components/Services/Services.jsx';
import Rooms from '../components/Rooms/Room.jsx';
import Amenities from '../components/Amenities/Amenities.jsx';
import Feedback from '../components/Feedbacks/Feedback.jsx';
import Footer from  '../components/Footer/Footer.jsx';

const HomePage = () => {
    return (
        <>
            <Nav />
            <Header />
            <About />
            <Services />
            <Rooms />
            <Amenities />
            <Feedback />
            <Footer />
        </>
    );
};

export default HomePage;