import React, {useEffect, useState} from 'react'
import NavBars from "../Sections/navbar";
import {Link} from "react-router-dom";
import {FiHome} from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../Sections/footer";
import ToTop from "../Sections/totop";
import axios from "axios";
import SinglePatient from "./SinglePatient";
import Alert from "react-bootstrap/Alert";

const Patient = () => {
    const [form, setForm] = useState(false);
    const [patient, setPatient] = useState([]);
    const [tc, setTc] = useState([]);
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [blood, setBlood] = useState([]);
    const [showSave, setShowSave] = useState(true);
    const [warning, setWarning]= useState(false);

    const handleWarning=()=>{
        setWarning(false)
    }
    const fetchPatient = async () => {
        try {
            const response = await axios.get("http://localhost:8080/patient", {
                headers: {
                    Authorization:localStorage.getItem("tokenKey")
                }
            });

            // Assuming setDoctors is a function to handle the response data
            setPatient(response.data);

        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    const createPatient = () => {
        axios.post("http://localhost:8080/patient", {
            id:"",
            patientName: `${name}`,
            patientSurname: `${surname}`,
            identityNo: `${tc}`,
            bloodType: `${blood}`
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization:localStorage.getItem("tokenKey")
            }
        }).then((res) => {
            console.log("Hasta oluşturuldu:", res.data);
            fetchPatient();
        })
            .catch((err) => alert("Bir Hata Oluştu:",err));
        setForm(false);
    }

    const handleName= (value)=>{
        setName(value);
    }
    const handleSurname= (value)=>{
        setSurname(value);
    }

    const handleTc = (value)=>{
        setTc(value);
    }

    const handleBlood=(value) =>{
        setBlood(value);
    }

    const handleClicked = () => {
        setForm(!form);
    }

    const updateSaveButton = () => {
        if((name === '' || surname === '' || tc === '' || blood.length===0)){
            setShowSave(false);
        }
        else
            setShowSave(true)
    }

    useEffect(() => {
        fetchPatient();
        updateSaveButton()
    }, []);
    return (
        <div>
            <NavBars/>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
                            <h1>Hasta Kayıt</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/home"}>
                                            <FiHome/>
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Hasta Kayıt
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
                        }} variant={"success"} style={{marginRight: 200}}>Yeni Hasta Kaydet</Button>
                    </div>
                    {form === true ? (<div className="col-md-7">
                        <Form style={{alignItems: "center", marginLeft: 600, marginTop: 80, marginBottom: 100}}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Hasta Adı :</Form.Label>
                                    <Form.Control onChange={(i)=>{handleName(i.target.value) }} type="name" placeholder="Hasta Adı Giriniz..."/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Hasta Soyadı :</Form.Label>
                                    <Form.Control onChange={(i)=>{handleSurname(i.target.value)}} type="surname" placeholder="Hasta Soyadı Giriniz..."/>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Hasta T.C</Form.Label>
                                <Form.Control onChange={(i)=>{handleTc(i.target.value)}} placeholder="Hasta T.C Giriniz..."/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Hasta Kan Tipi</Form.Label>
                                <Form.Select onClick={(i)=>{handleBlood(i.target.value)}} >
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                    <option>0+</option>
                                    <option>0-</option>
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
                            <Button disabled={showSave} onClick={createPatient} className="float-end" variant="primary" type="button">
                                Kaydet
                            </Button>
                            {warning === true ? (<Alert style={{marginTop: 60, marginLeft: 0, width: 400}}
                                                        onClose={() => handleWarning()} variant="danger" dismissible>
                                Hasta Oluşturulurken Bir Hata Oluştu!
                            </Alert>) : (<div></div>)}
                        </Form>
                    </div>) : (<div></div>)}
                    <ul>
                        <div className="reportTables text-center d-flex col-md-6">
                            <table>
                                <thead>
                                <tr>
                                    <th>Hasta Adı Soyadı</th>
                                    <th>T.C</th>
                                    <th>Kan Tipi</th>
                                </tr>
                                </thead>
                                {patient.map((patient, idx) => (
                                    <SinglePatient key={idx} patient={patient}/>
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
export default Patient
