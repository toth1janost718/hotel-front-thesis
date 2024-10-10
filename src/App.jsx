import './App.css'
import './global.css'
import {BrowserRouter as  Router} from "react-router-dom";
import AppRoutes from './AppRoutes.jsx'


function App() {

    return (
        <Router>
            <AppRoutes />
        </Router>
    );

}





export default App
