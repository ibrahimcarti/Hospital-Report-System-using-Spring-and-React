import React from 'react'
import member5 from "../Assets/member5.24eb1821.jpg";


const SingleDoctor = ({doctor}) => {
    return (
        <div className="col-lg-2 col-sm-3">
            <div className="team-member padding margin" >
                <div className="team-media">
                    <img src={member5} alt="img" />
                </div>
                <div className="team-info">
                    <div className="team-info-comntent">
                        <h4 className="title">{doctor.technicianName} {doctor.technicianSurname}</h4>
                        <span className="text-secondary">{doctor.department}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SingleDoctor
