import React from 'react'

const SinglePatient = ({patient , idx}) => {
    return (
        <tbody >
        <tr  key={idx}>
            <td className="text-center">{patient.patientName} {patient.patientSurname}</td>
            <td className="text-center">{patient.identityNo}</td>
            <td className="text-center">{patient.bloodType}</td>
        </tr>
        </tbody>
    )
}
export default SinglePatient
