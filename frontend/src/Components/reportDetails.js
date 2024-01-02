import React, {useEffect, useState} from 'react'
import NavBars from "../Sections/navbar";
import {Link} from "react-router-dom";
import {FiHome} from "react-icons/fi";
import Footer from "../Sections/footer";
import ToTop from "../Sections/totop";
import {useParams} from 'react-router-dom';
import axios from "axios";

const ReportDetails = () => {

    const {id} = useParams();


    const [reports,setReports]= useState([]);
    const [doctor, setDoctor] = useState([]);
    const [patient,setPatient] = useState([]);
    const [image,setImage]=useState([]);


    const fetchImages = async ()=>{
        try {
            const response = await fetch(`http://localhost:8080/image/reportimage/${id}`);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImage(url);
        } catch (error) {
            console.error('Fotoğraf alınamadı:', error);
        }
    }

    const fetchReports = async ()=>{
        try {
            const response = await axios.get(`http://localhost:8080/report/${id}`, {
                headers: {
                    Authorization:localStorage.getItem("tokenKey")
                }
            });

            setReports(response.data);

        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    }

    const fetchDoctor = async (idy) => {
        try {
            const response = await axios.get(`http://localhost:8080/technician/${idy}`, {
                headers: {
                    Authorization:localStorage.getItem('tokenKey'),
                },
            });

            setDoctor(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchPatients = async (idx) => {
        try {
            const response = await axios.get(`http://localhost:8080/patient/${idx}`, {
                headers: {
                    Authorization:localStorage.getItem('tokenKey'),
                },
            });

            setPatient(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    useEffect(() => {
        fetchImages()
        fetchReports()
        fetchPatients(reports.patientId)
        fetchDoctor(reports.technicianId)
    }, [reports.patientId, reports.technicianId,id]);


    return (
        <div>
            <NavBars/>
            <div className="banner-wraper">
                <div className="page-banner">
                    <div className="container">
                        <div className="page-banner-entry text-center">
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
            <div className="reportContainer ">
                <div className="reportHeading"><h1>RAPOR DETAYLARI</h1></div>
                <div className="reportDetail">
                    <div style={{fontSize:15}}><p><b>Doktor Adı Soyadı:</b> {doctor.technicianName} {doctor.technicianSurname}</p><p><b>Hastane Kimlik Numarası :</b> {doctor.hospitalIdentity}</p><p><b>Departman :</b> {doctor.department} </p></div>
                    <div style={{fontSize:15}}><p><b>Hasta Adı Soyadı:</b> {patient.patientName} {patient.patientSurname} </p><p><b>T.C Numarası :</b> {patient.identityNo}</p><p><b>Kan Tipi :</b> {patient.bloodType}</p></div>
                </div>
                <div className="reportMedical">
                    <div className="col-md-2" style={{fontSize:20}}><p><b>Tanı Başlığı :</b> </p><p><b>Tanı Detayları :</b></p></div>
                    <div className="col-md-10" style={{fontSize:20}}><p>{reports.reportTitle}</p><p> {reports.reportDescription}</p><p></p>
                    </div>
                </div>
                <br></br>
                <div className="col-md-12 text-center margin"><b>Rapora Ait Görseller :</b></div>
                <div className="col-md-12 text-center margin margn">
                    {image ? (
                        <img src={image} alt="Fotoğraf" />
                    ) : (
                        <p>Fotoğraf yükleniyor...</p>
                    )}
                </div>
                <div style={{fontSize:20}} className="reportDate margn"><p style={{marginRight:50}} className="float-end "><b>Muayene Tarihi :</b> {reports.reportGivenDate}</p></div>
            </div>
            <Footer/>
            <ToTop/>
        </div>
    )
}
export default ReportDetails
