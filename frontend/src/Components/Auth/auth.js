import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, Input, Button} from "@mui/material"
import NavBars from "../../Sections/navbar";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Footer from "../../Sections/footer";
import ToTop from "../../Sections/totop";
import {FiHome} from "react-icons/fi";
import Alert from "react-bootstrap/Alert";

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [doctor, setDoctor] = useState([]);
    const navigate = useNavigate();
    const [warning, setWarning]= useState(false);



    const fetchDoctor = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/technician/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('tokenKey'),
                },
            });

            setDoctor(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const sendRequest = (path) => {
        axios.post("http://localhost:8080/auth/" + path, {
            userName: username,
            password: password,
        })
            .then((res)=> res.data)
            .then((result) => {
                localStorage.setItem("tokenKey", result.accessToken);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userRole", result.role);
                navigate('/home');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error in login request:', error);
                setWarning(true)
            });
    }


    const handleUsername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        setpassword(value);
    };

    const handleLogin = () => {
        sendRequest("login");
        setUsername("");
        setpassword("");
    };

    const handleWarning = ()=>{
        setWarning(false)
    }

    useEffect(() => {
        fetchDoctor(localStorage.getItem("currentUser"))
    }, []);

    return (
        <>
            <NavBars/>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">

                            <h1>Giriş Sayfası</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/home"}>
                                            <FiHome />
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Giriş
                                    </li>
                                </ul>
                            </nav>
                            {warning===true ? (<Alert  style={{marginTop:30,marginLeft:450,width:400}} onClose={()=>handleWarning()} variant="danger"  dismissible>
                                Kullanıcı Adı ve ya Şifre Yanlış!
                            </Alert>) : (<div></div>)}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 0}}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 50}}>
                    <FormControl style={{width: 500, height: 300}}>
                        <InputLabel>Hastane Kimlik Numarası</InputLabel>
                        <Input onChange={(i) => handleUsername(i.target.value)}/>
                        <InputLabel style={{top: 80}}>T.C Numarası</InputLabel>
                        <Input type="password" onChange={(i) => handlePassword(i.target.value)} style={{top: 40}}/>
                        <Button onClick={handleLogin} variant="contained" style={{
                            marginTop: 100,
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            color: 'white',
                            height: 60,
                            fontSize: 20
                        }}>Giriş Yap</Button>
                    </FormControl>
                </div>
            </div>
            <Footer />
            <ToTop />
        </>
    )
}

export default Auth;
