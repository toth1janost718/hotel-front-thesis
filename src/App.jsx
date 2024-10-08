import './App.css'
import Nav from './components/Nav/Nav.jsx';
import Header from './components/Header/Header.jsx';
import About from './components/About/About.jsx';
import Services from './components/Services/Services.jsx';
import Rooms from './components/Rooms/Room.jsx';
import Amenities from './components/Amenities/Amenities.jsx';

function App() {


  return (

      <>
          <Nav />
          <Header />
          <About/>
          <Services/>
          <Rooms/>
          <Amenities/>

      </>

  )
}

export default App
