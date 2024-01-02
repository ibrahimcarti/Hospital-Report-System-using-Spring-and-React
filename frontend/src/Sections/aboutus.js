import about1 from "../Assets/pic-1.ad1ed7ee.jpg";
import about2 from "../Assets/pic-2.0593bc2f.jpg";
import about3 from "../Assets/pic-3.fa689b10.jpg";
import { FaAmbulance, FaBed, FaSyringe } from "react-icons/fa";
import "./aboutus.css"
import {GiDoctorFace} from "react-icons/gi";
function AboutUs() {
  return (
    <div >
      <section className="section about-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-30">
              <div className="about-images">
                <ul>
                  <li>
                    <img className="img1" src={about1}  />
                  </li>
                  <li>
                    <img className="img2" src={about2}  />
                  </li>
                  <li>
                    <img className="img3" src={about3}  />
                  </li>
                  <li>
                    <div className="exp-bx">
                      10
                      <span>Yıllık Tecrübe</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 mb-30">
              <div className="heading-bx">
                <h6>Hakkımızda</h6>
                <h2 className="title">
                  Medpol Hastanesi
                </h2>
                <p>
                  Hastanemizde yer alan sağlık bakımı tedavisini en yüksek düzeyde teknolojilerle hizmetinize sunuyoruz.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-sm-6 mb-30">
                  <div className="feature1">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <FaAmbulance />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4>Acil Durum</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 mb-30">
                  <div className="feature1">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <FaBed />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4>Tam Teşekkürlü Odalar</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 mb-30">
                  <div className="feature1">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <GiDoctorFace />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4>Alanında En İyi Doktorlar</h4>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6 mb-30">
                  <div className="feature1">
                    <div className="icon-md">
                      <span className="icon-cell">
                        <FaSyringe />
                      </span>
                    </div>
                    <div className="icon-content">
                      <h4>Tıbbi Tedavi</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
