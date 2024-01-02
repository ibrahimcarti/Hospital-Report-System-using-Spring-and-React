import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {FaEdit} from "react-icons/fa";
import {MdPreview} from "react-icons/md";
import {FaTrashAlt} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';
import {TextField} from "@mui/material";


const SingleReport = ({report, idx, search}) => {
    const [doctor, setDoctor] = useState([]);
    const [patient, setPatient] = useState([]);
    const [patientByIdentity, setPatientByIdentity] = useState([]);
    const [tc, setTc] = useState({});
    const navigate = useNavigate();
    const date = new Date();
    const [editMode, setEditMode] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState({});
    const [updatedDescription, setUpdatedDescription] = useState({});
    const [filteredReports, setFilteredReports] = useState();
    const [filteredReportsx, setFilteredReportsx] = useState();
    const [foto, setFoto] = useState(null);
    const fetchPatientByIdentity = async (id) => {
        try {
            if (!tc || !isValidTC(tc)) {
                console.error("Geçerli bir TC girilmedi veya TC geçerli değil:", tc);
                return;
            }

            const response = await axios.get(`http://localhost:8080/patient/identity/${id}`, {
                headers: {
                Authorization:localStorage.getItem("tokenKey")
                }
            });

            setPatientByIdentity(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    }
    const handleUpdadetTitle = (value) => {
        setUpdatedTitle(value);
    };
    const handleUpdadetDescription = (value) => {
        setUpdatedDescription(value);
    };
    const isValidTC = (tc) => {
        return tc.length === 11;
    }

    const handleTC = (value) => {
        setTc(value);
    }
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/report/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    alert('User successfully deleted.');
                }
            })
    }
    const fetchDoctor = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/technician/${id}`, {
                headers: {
                    Authorization:localStorage.getItem('tokenKey'),
                },
            });

            setDoctor(response.data);
            const filtered =
                doctor.technicianName.toLowerCase().includes(search) ||
                doctor.technicianSurname.toLowerCase().includes(search);
            setFilteredReports(filtered)
            if(search===""){
                setFilteredReports(!filtered)
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchPatients = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/patient/${id}`, {
                headers: {
                    Authorization:localStorage.getItem('tokenKey'),
                },
            });
            setPatient(response.data);

            const filteredx =
                patient.patientName.toLowerCase().includes(search) ||
                patient.patientSurname.toLowerCase().includes(search)||
                patient.identityNo.includes(search)
                setFilteredReportsx(filteredx)
            if(search===""){
                setFilteredReportsx(!filteredx)
            }

        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };


    const handleEdit = async () => {
        setClicked(!clicked);
        setEditMode(!clicked);

        try {
            await fetchPatientByIdentity(tc);

            setUpdatedTitle(report.title);
            setUpdatedTitle(report.reportDescription)
            setTc(patient.identityNo);
        } catch (error) {
            console.error('Error fetching patient by identity:', error);
        }
    }

    const handleSave = () => {
        fetchPatientByIdentity(tc).then(() => {
            axios
                .put(`http://localhost:8080/report/${report.id}`, {
                    reportTitle: updatedTitle,
                    reportDescription: updatedDescription,
                    reportGivenDate: date,
                    patientId: patientByIdentity.id,
                    technicianId: localStorage.getItem("currentUser")
                })
                .then(response => {
                    if (response.status === 200) {
                        window.location.reload();
                        alert('Report successfully updated.');
                        const olusturulanRaporID = response.data.id;
                        try{
                            axios.put(`http://localhost:8080/image/putImage/${report.id}`,{
                                image:foto,
                                reportId:report.id
                            },{
                                headers:{
                                    "Content-Type": "multipart/form-data",
                                    Authorization:localStorage.getItem("tokenKey")
                                }
                            })}catch (err) {console.log(err)}
                    }
                })
                .catch(error => {
                    console.error('Error updating report:', error);
                })
                .finally(() => {
                    setEditMode(false);
                });

        })
    }
    const handleFotoChange = (e) => {
        setFoto(e.target.files[0]);
    };



    useEffect(() => {
        fetchDoctor(report.technicianId);
        fetchPatients(report.patientId);
        if (editMode && tc) {
            fetchPatientByIdentity(tc);
        }
    }, [report.technicianId, report.patientId, tc,search,foto]);

    return (
        <>
            <tr key={idx} style={{ backgroundColor: filteredReports===true ||filteredReportsx===true ? 'lightblue' : 'inherit' }}>
                <td className="text-center">{report.id}</td>
                <td className="text-center">{patient.patientName} {patient.patientSurname}</td>
                <td className="text-center">{patient.identityNo}</td>
                <td className="text-center">{report.reportTitle}</td>
                <td className="text-center">{doctor.technicianName} {doctor.technicianSurname}</td>
                <td className="text-center">{report.reportGivenDate}</td>
                <td>
                    <div className="d-sm-flex gap-2 "><Button onClick={() => {
                        navigate(`/reportdetail/${report.id}`, {reportId: report.id});
                    }} variant="warning"><MdPreview size={25}/><br></br>Görüntüle</Button>{' '}
                        <Button onClick={() => {
                            handleEdit()
                        }} variant="info" size={"lg"}><FaEdit size={25}/><br></br>Düzenle</Button>{' '}
                        {localStorage.getItem("userRole") === "Yönetici" ? (<Button onClick={() => {
                            handleDelete(report.id)
                        }} variant="danger"><FaTrashAlt size={25}/><br></br>Sil</Button>) : (<div></div>)}</div>
                </td>
            </tr>
            {editMode && (
                <tr>
                    <td colSpan={8}>
                        <form className="d-flex ">
                            <label className="margin">Tanı: </label>
                            <TextField style={{marginLeft: 10}}
                                       type="text"
                                       placeholder={report.reportTitle}
                                       onChange={(e) => handleUpdadetTitle(e.target.value)}
                            />
                            <label className="margin">Tanı Detayı: </label>
                            <TextField style={{marginLeft: 10}}
                                       placeholder={report.reportDescription}
                                       onChange={(e) => handleUpdadetDescription(e.target.value)}
                            />

                            <label className="margin">Hasta T.C: </label>
                            <TextField
                                disabled
                                type="text"
                                placeholder={patient.identityNo}
                                onChange={(e) => {
                                    handleTC(e.target.value)
                                }}
                            />
                            <label className="margin">Fotoğraf: </label>
                            <input className="margin" type="file" accept="image/*" onChange={handleFotoChange}/>
                            <Button style={{marginLeft: 20}} variant="primary" onClick={handleSave}>Kaydet</Button>
                        </form>
                    </td>
                </tr>
            )}
        </>
    );
};

export default SingleReport;