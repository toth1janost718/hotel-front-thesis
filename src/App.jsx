import './App.css'
import Nav from './components/Nav/Nav.jsx';
import Header from './components/Header/Header.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import Rooms from './components/Rooms/Room.jsx';
import Amenities from './components/Amenities/Amenities.jsx';
import Feedback from './components/Feedbacks/Feedback.jsx';
import Footer from  './components/Footer/Footer.jsx';
import {BrowserRouter as  Router, Routes,Route} from "react-router-dom";
import LoginPage from './pages/loginPage/LoginPage.jsx'

function App() {


  return (
    <Router>
      <>
          <Routes>

              {/* Főoldal felépítése */}

              <Route
                  path="/"
                  element={

              <>
              <Nav />
              <Header />
              <About/>
              <Services/>
              <Rooms/>
              <Amenities/>
              <Feedback/>
              <Footer/>
              </>

          }
              />
              {/* További oldalak hozzáadása */}
              <Route path="/login" element={<LoginPage/>} />
          </Routes>
      </>
    </Router>
  )
}

export default App
