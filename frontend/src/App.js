import "./index.css";
import Home from "./Components/home";
import About from "./Components/about";
import OurTeam from "./Components/ourteam";
import NotFound from "./Components/notfound";
import Service from "./Components/service";
import Report from "./Components/Report";
import {Routes, Route} from "react-router-dom";
import Auth from "./Components/Auth/auth";
import ReportDetails from "./Components/reportDetails";
import Patient from "./Components/patient";
import Doctor from "./Components/doctor";
import Noauth from "./Components/noauth";

function App() {

    return (
        <Routes >
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/ourteam" element={<OurTeam/>}/>
            <Route path="/service" element={<Service/>}/>
            <Route path="/Report" element={localStorage.getItem("userRole")==="Teknisyen"|| localStorage.getItem("userRole")==="Yönetici" ? (<Report/>):(<Noauth/>)}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/reportDetail/:id" element={localStorage.getItem("userRole")==="Teknisyen"|| localStorage.getItem("userRole")==="Yönetici" ? (<ReportDetails/>):(<Noauth/>)}/>
            <Route path="/hastaKayit"  element={localStorage.getItem("userRole")==="Teknisyen"|| localStorage.getItem("userRole")==="Yönetici" ? (<Patient/>):(<Noauth/>)}/>
            <Route path="/doktorKayit" element={localStorage.getItem("userRole")==="Teknisyen"|| localStorage.getItem("userRole")==="Yönetici" ? (<Doctor/>):(<Noauth/>)}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
