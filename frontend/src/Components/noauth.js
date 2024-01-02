import NavBars from "../Sections/navbar";
import Footer from "../Sections/footer";
import "./about.css";
import { FiHome } from "react-icons/fi";
import "./notfound.css";
import "../index.css";
import ToTop from "../Sections/totop";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <NavBars />
      <div className="banner-wraper">
        <div className="page-banner">
          <div className="container">
            <div className="page-banner-entry text-center">
              <h1>Bu Sayfayı Görmek İçin Yetkiniz Yok</h1>
              <nav aria-label="breadcrumb" className="breadcrumb-row">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>
                      <FiHome />
                      Anasayfa
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Yetki Yok
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <section className="section-area section-sp2 error-404">
        <div className="container">
          <div className="inner-content">
            <h2 className="error-title">
              4<span></span>4
            </h2>
            <h3 className="error-text">
              Bu sayfayı görmek için yetkili girişi gerekmektedir.
            </h3>
            <div className="clearfix">
              <a className="btn btn-primary" href="/home">
                Anasayfa'ya Dön
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ToTop />
    </div>
  );
}

export default NotFound;
