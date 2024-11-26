import './App.css'
import './global.css'
import {BrowserRouter as  Router} from "react-router-dom";
import AppRoutes from './AppRoutes.jsx'
import { AuthProvider } from './context/AuthContext.jsx';
import Content from "./protected/components/Content/Content.jsx";


function App() {

    return (
        <AuthProvider>
         <Router>
            <AppRoutes />
             <Content />
          </Router>
        </AuthProvider>
    );

}


export default App
