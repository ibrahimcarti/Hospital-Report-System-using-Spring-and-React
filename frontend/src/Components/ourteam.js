import "./about.css";
import { FiHome } from "react-icons/fi";
import NavBars from "../Sections/navbar";
import Footer from "../Sections/footer";
import ToTop from "../Sections/totop";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import SingleDoctor from "./SingleDoctor";
import axios from "axios";
function OurTeam() {
  const [doctors,setDoctors]= useState([])

  const fetchDoctors = async ()=>{
      try {
          const response = await axios.get("http://localhost:8080/technician", {
              headers: {
                  Authorization:localStorage.getItem("tokenKey")
              }
          });

          // Assuming setDoctors is a function to handle the response data
          setDoctors(response.data);

      } catch (error) {
          console.error("Error fetching doctors:", error);
      }
  }



  useEffect(() => {
    fetchDoctors()
  }, []);
  return (
    <div>
      <NavBars />
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Doktorlarımız</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>
                      <FiHome />
                      Anasayfa
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Doktorlarımız
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="doctor-body">
        <div className="doctor-list">
          <ul className="gap-5">
            {doctors.map((doctor, id) => (
                <SingleDoctor doctor={doctor} key={id}/>
            ))}
          </ul>

        </div>
      </div>
      <Footer />
      <ToTop />
    </div>
  );
}

export default OurTeam;
