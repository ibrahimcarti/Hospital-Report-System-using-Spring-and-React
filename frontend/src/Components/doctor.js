import React, {useEffect, useState} from 'react'
import axios from "axios";
import NavBars from "../Sections/navbar";
import {Link} from "react-router-dom";
import {FiHome} from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Sections/footer";
import ToTop from "../Sections/totop";
import SingleDoctorTable from "./SingleDoctorTable";
import Alert from "react-bootstrap/Alert";

const Doctor = () => {
    const [form, setForm] = useState(false);
    const [doctor, setDoctor] = useState([]);
    const [tc, setTc] = useState([]);
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [role, setRole] = useState([]);
    const [department, setDepartment] = useState([]);
    const [hospitalIdentity, setHospitalIdentity] = useState([]);
    const [warning, setWarning]= useState(false);


    const fetchDoctor = async () => {
        try {
            const response = await axios.get("http://localhost:8080/technician", {
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            });

            setDoctor(response.data);

        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    const createDoctor = () => {
        axios.post("http://localhost:8080/auth/register", {
            id: "",
            technicianName: `${name}`,
            technicianSurname: `${surname}`,
            userName: `${hospitalIdentity}`,
            password: `${tc}`,
            department: `${department}`,
            ridNo: `${tc}`,
            role: `${role}`
        }, {
            headers: {
                Authorization: localStorage.getItem("tokenKey")
            },
        }).then((res) => {
            fetchDoctor();
            alert("Doktor oluşturuldu:", res.data);
        })
            .catch((err) => {
                console.log("Doktor oluşturulurken bir hata oluştu:", err)
                setWarning(true)
            })
        setForm(false);
    }

    const handleWarning =()=>{
        setWarning(false)
    }
    const handleName = (value) => {
        setName(value);
    }
    const handleSurname = (value) => {
        setSurname(value);
    }

    const handleTc = (value) => {
        setTc(value);
    }

    const handlehospitalIdentity = (value) => {
        setHospitalIdentity(value);
    }

    const handleRole = (value) => {
        setRole(value);
    }

    const handleDepartment = (value) => {
        setDepartment(value);
    }

    const handleClicked = () => {
        setForm(!form);
    }

    useEffect(() => {
        fetchDoctor();
    }, []);
    return (
        <div>
            <NavBars/>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
                            <h1>Doktor Kayıt</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/home"}>
                                            <FiHome/>
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Doktor Kayıt
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="doctor-list">
                    <div className="float-end">
                        <Button onClick={() => {
                            handleClicked()
                        }} variant={"success"} style={{marginRight: 200}}>Yeni Doktor Kaydet</Button>
                    </div>
                    {form === true ? (<div className="col-md-7">
                        <Form style={{alignItems: "center", marginLeft: 600, marginTop: 80, marginBottom: 100}}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Doktor Adı :</Form.Label>
                                    <Form.Control onChange={(i) => {
                                        handleName(i.target.value)
                                    }} type="name" placeholder="Doktor Adı Giriniz..."/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Doktor Soyadı :</Form.Label>
                                    <Form.Control onChange={(i) => {
                                        handleSurname(i.target.value)
                                    }} type="surname" placeholder="Doktor Soyadı Giriniz..."/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Doktor T.C</Form.Label>
                                <Form.Control onChange={(i) => {
                                    handleTc(i.target.value)
                                }} placeholder="Doktor T.C Giriniz..."/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Hastane Kimlik No</Form.Label>
                                <Form.Control onChange={(i) => {
                                    handlehospitalIdentity(i.target.value)
                                }} placeholder="Hastane Kimlik No Giriniz..."/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Rol</Form.Label>
                                <Form.Select onClick={(i) => {
                                    handleRole(i.target.value)
                                }} defaultValue={"Teknisyen"}>
                                    <option>Teknisyen</option>
                                    <option>Yönetici</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Departman</Form.Label>
                                <Form.Select onClick={(i) => {
                                    handleDepartment(i.target.value)
                                }} defaultValue="Genel Cerrahi">
                                    <option>Genel Cerrahi</option>
                                    <option>Dermatoloji</option>
                                    <option>Göğüs Cerrahisi</option>
                                    <option>Göz Hastalıkları</option>
                                    <option>Kadın Hastalıkları ve Doğum</option>
                                    <option>Kalp Damar Cerrahisi</option>
                                    <option>Robotik Cerrahi</option>
                                </Form.Select>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    {/*<Form.Label>City</Form.Label>*/}
                                    {/*<Form.Control />*/}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    {/*<Form.Label>State</Form.Label>*/}

                                </Form.Group>

                                <Form.Group as={Col}>
                                    {/*<Form.Label>Zip</Form.Label>*/}
                                    {/*<Form.Control />*/}
                                </Form.Group>
                            </Row>
                            <Button onClick={createDoctor} className="float-end" variant="primary" type="button">
                                Kaydet
                            </Button>
                        </Form>

                    </div>) : (<div></div>)}
                    {warning === true ? (<Alert style={{marginTop: 70, marginLeft: 650, width: 400}}
                                                onClose={() => handleWarning()} variant="danger" dismissible>
                        Doktor Oluşturulurken Bir Hata Oluştu!
                    </Alert>) : (<div></div>)}
                    <ul>
                        <div className="reportTables text-center d-flex col-md-7">
                            <table>
                                <thead>
                                <tr>
                                    <th>Doktor Adı Soyadı</th>
                                    <th>Hastane Kimlik No</th>
                                    <th>T.C</th>
                                    <th>Departman</th>
                                    <th>Rol</th>
                                </tr>
                                </thead>
                                {doctor.map((doctor, idx) => (
                                    <SingleDoctorTable key={idx} doctor={doctor}/>
                                ))}
                            </table>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer/>
            <ToTop/>
        </div>
    )
}
export default Doctor
