import { Link } from "react-router-dom";
import doctor from "../Assets/doctor.webp";
import "./banner.css";
function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-7">
            <h5 className="backimg">Medpol Hastanesi</h5>
            <h2>Sağlığınızla İlgilenmek ve Korumak İçin Buradayız</h2>
            <button>
              <Link to={"/about"}>Daha Fazla</Link>
            </button>
          </div>

          <div className="col-lg-5 col-md-5 bannerImg">
            <img src={doctor} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
