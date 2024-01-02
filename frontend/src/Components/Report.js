import "./Report.css";
import "./about.css";
import "../index.css";
import NavBars from "../Sections/navbar";
import {FiHome} from "react-icons/fi";
import Footer from "../Sections/footer";
import ToTop from "../Sections/totop";
import {Link} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import SingleReport from "./SingleReport";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {FaSort} from "react-icons/fa";
import {Input} from "@mui/material";
import Alert from 'react-bootstrap/Alert';

function Service() {
    const [form, setForm] = useState(false);
    const [reports, setReports] = useState([]);
    const [patient, setPatient] = useState([]);
    const [technician, setTechnician] = useState([]);
    const [tc, setTc] = useState([]);
    const [title, setTitle] = useState([]);
    const [detail, setDetail] = useState([]);
    const timedetail = new Date();
    const [clicked, setClicked] = useState(false);
    const [search, setSearch] = useState("");
    const [foto, setFoto] = useState(null);
    const [active, setActive] = useState(true);
    const [showSave, setShowSave] = useState(true);
    const [warning, setWarning] = useState(false);

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };

    const createReport = () => {
        fetchPatient(tc).then(() => {
            axios.post("http://localhost:8080/report", {
                id: "",
                reportTitle: `${title}`,
                reportDescription: `${detail}`,
                reportGivenDate: timedetail,
                technicianId: technician.id,
                patientId: patient.id
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("tokenKey")
                }
            }).then((res) => {
                console.log("Rapor oluşturuldu:", res.data);
                const olusturulanRaporID = res.data.id;

                try {
                    axios.post("http://localhost:8080/image", {
                        image: foto,
                        reportId: olusturulanRaporID
                    }, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: localStorage.getItem("tokenKey"),
                            image: foto,
                            reportId: olusturulanRaporID
                        }
                    })
                } catch (err) {
                    console.log(err)
                }
                fetchReports().then(r => setForm(!form));
            })
                .catch((err) => {
                    console.log("Rapor oluşturulurken bir hata oluştu:", err)
                    setWarning(true)
                });
        })
    }

    const handleClick = () => {
        setClicked(!clicked)
    }

    const fetchPatient = async (id) => {
        try {
            if (!tc || !isValidTC(tc)) {
                console.error("Geçerli bir TC girilmedi veya TC geçerli değil:", tc);
                return;
            }

            const response = await axios.get(`http://localhost:8080/patient/identity/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            });

            setPatient(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }

    const fetchTechnician = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/technician/${localStorage.getItem("currentUser")}`, {
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            });

            setTechnician(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }
    const isValidTC = (tc) => {
        return tc.length === 11;
    }


    const fetchReports = async () => {
        try {
            const response = await axios.get("http://localhost:8080/report", {
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            });
            if (clicked === false) {
                setReports(response.data)
            } else {
                const sortedReports = response.data.sort((a, b) => new Date(b.reportGivenDate) - new Date(a.reportGivenDate));
                setReports(sortedReports)
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }

    const fetchReportsByTechnicianId = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/report/byTechnicianId/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("tokenKey")
                }
            });
            if (clicked === false) {
                setReports(response.data)
            } else {
                const sortedReports = response.data.sort((a, b) => new Date(b.reportGivenDate) - new Date(a.reportGivenDate));
                setReports(sortedReports)
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
        }
    }
    const handleTC = (value) => {
        setTc(value)
    }

    const handleTitle = (value) => {
        setTitle(value)
    }

    const handleDetail = (value) => {
        setDetail(value)
    }

    const handleClicked = () => {
        setForm(!form);
    }
    const handleSaveForm = () => {
        if (title === "" || detail === "" || tc === "" || !foto) {
            setShowSave(true)
        } else
            setShowSave(false)
    }

    const handleSearch = (value) => {
        setSearch(value.toLowerCase())
        search.toLowerCase()
    }

    const handleWarning = () => {
        setWarning(false)
    }

    useEffect(() => {
        {
            localStorage.getItem("userRole") === "Yönetici" ? (fetchReports()) : (fetchReportsByTechnicianId(localStorage.getItem("currentUser")))
        }
        if (reports.length === 5) {
            setActive(true);
        } else {
            setActive(false);
        }
        handleSaveForm()
        fetchTechnician();
        fetchPatient(tc);
    }, [tc, clicked, search, reports, showSave, foto]);
    return (
        <div>
            <NavBars/>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
                            {active === true ? (<Alert variant="danger" dismissible>
                                Bir Teknisyen En Fazla 5 Rapor Ekleyebilir!
                            </Alert>) : (<div></div>)}
                            <h1>Raporlar</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/home"}>
                                            <FiHome/>
                                            Anasayfa
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        Raporlar
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="doctor-body">
                <div className="doctor-list">
                    <div className="float-end">
                        <Button disabled={active} onClick={() => {
                            handleClicked()
                        }} variant={"success"} style={{marginRight: 230}}>Yeni Rapor Oluştur</Button>
                    </div>
                    <div className="float-end d-block block "><label><b>Arama :</b> </label> <Input onChange={(e) => {
                        handleSearch(e.target.value)
                    }}></Input> <Button style={{marginRight: 20}}> Arama</Button></div>
                    {form === true ? (<div className="col-md-7">
                        <Form style={{alignItems: "center", marginLeft: 600, marginTop: 80, marginBottom: 100}}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Hasta T.C :</Form.Label>
                                    <Form.Control onChange={(i) => {
                                        handleTC(i.target.value)
                                    }} type="t.c" placeholder="Hasta T.C Giriniz..."/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Tanı Başlığı</Form.Label>
                                <Form.Control onChange={(i) => {
                                    handleTitle(i.target.value)
                                }} placeholder="Bir Tanı Başlığı Giriniz..."/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tanı Detayı</Form.Label>
                                <Form.Control as="textarea" style={{height: 150}} onChange={(i) => {
                                    handleDetail(i.target.value)
                                }} placeholder="Bir Tanı Detayı Giriniz..."/>
                            </Form.Group>

                            <Row className="mb-6">
                                <Form.Group as={Col} className="col-md-6">
                                    <Form.Label>Fotoğraf</Form.Label>
                                    <input type="file" accept="image/*" onChange={handleFotoChange}/>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    {/*<Form.Label>State</Form.Label>*/}
                                    {/*<Form.Select defaultValue="Choose...">*/}
                                    {/*    <option>Choose...</option>*/}
                                    {/*    <option>...</option>*/}
                                    {/*</Form.Select>*/}
                                </Form.Group>

                                <Form.Group as={Col}>
                                    {/*<Form.Label>Zip</Form.Label>*/}
                                    {/*<Form.Control />*/}
                                </Form.Group>
                            </Row>
                            <Button disabled={showSave} className="float-end margin" onClick={() => {
                                createReport()
                            }} variant="primary" type="button">
                                Raporu Kaydet
                            </Button>
                            {warning === true ? (<Alert style={{marginTop: 70, marginLeft: 0, width: 400}}
                                                        onClose={() => handleWarning()} variant="danger" dismissible>
                                Rapor Oluşturulurken Bir Hata Oluştu!
                            </Alert>) : (<div></div>)}
                        </Form>
                    </div>) : (<div></div>)}
                    <ul>

                        <div className="reportTables text-center d-flex col-md-9">
                            <table>
                                <thead>
                                <tr>
                                    <th>Rapor Numarası</th>
                                    <th>Hasta Adı Soyadı</th>
                                    <th>Hasta T.C</th>
                                    <th>Tanı</th>
                                    <th>Doktor Adı Soyadı</th>
                                    <th><FaSort size={25} onClick={handleClick}/> Rapor Veriliş Tarihi</th>
                                    <th>İşlemler</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reports.map((report, idx) => (

                                    <SingleReport key={idx} report={report} search={search}/>

                                ))}
                                </tbody>
                            </table>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer/>
            <ToTop/>
        </div>
    );
}

export default Service;
