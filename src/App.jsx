import './App.css'
import './global.css'
import {BrowserRouter as  Router} from "react-router-dom";
import AppRoutes from './AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx';




function App() {

    return (
        <AuthProvider>
         <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
    );

}





export default App
