import React from 'react'
import Button from "react-bootstrap/Button";
import {FaTrashAlt} from "react-icons/fa";
import axios from "axios";

const SingleDoctorTable = ({doctor, idx}) => {
    const handleDelete = (id)=>{
        axios
            .delete(`http://localhost:8080/technician/${id}`)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                    alert('User successfully deleted.');
                }
            })
    }
    return (
        <tbody >
        <tr  key={idx}>
            <td className="text-center">{doctor.technicianName} {doctor.technicianSurname}</td>
            <td className="text-center">{doctor.hospitalIdentity}</td>
            <td className="text-center">{doctor.ridNo}</td>
            <td className="text-center">{doctor.department}</td>
            <td className="text-center">{doctor.role}</td>
            <td className="text-center"> {localStorage.getItem("userRole") === "Yönetici" ? (<Button size={20} onClick={()=>{handleDelete(doctor.id)}} variant="danger"><FaTrashAlt  size={20}/><br></br>Sil</Button>) :(<div></div>)}  </td>
        </tr>
        </tbody>
    )
}
export default SingleDoctorTable
