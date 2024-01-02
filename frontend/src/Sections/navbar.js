import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../Assets/Logo.png";
import {Link, useNavigate} from "react-router-dom";
import "./navbar.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const notify = (text) => toast(text);


function NavBars() {
  const navigate = useNavigate();
  return (
    <div className="navStick">
      <ToastContainer />
      <Navbar expand="lg">
        <Container fluid>
          <Link to={"/home"} className="navbar-brand">
            <img src={Logo} title="logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {localStorage.getItem("userRole")==="Yönetici"?(
                  <Link to={"/doktorKayit"} className="nav-link">
                    Doktor Kayıt
                  </Link>): <div></div>}
              {localStorage.getItem("userRole")==="Yönetici" || localStorage.getItem("userRole")==="Teknisyen" ?(
                  <Link to={"/hastaKayit"} className="nav-link">
                    Hasta Kayıt
                  </Link>): <div></div>}
              {localStorage.getItem("userRole")==="Yönetici" || localStorage.getItem("userRole")==="Teknisyen" ?(
                  <Link to={"/report"} className="nav-link">
                    Raporlar
                  </Link>): <div></div>}
              <Link to={"/ourteam"} className="nav-link">
                Doktorlarımız
              </Link>
              {localStorage.getItem("currentUser") ? (
                <Link
                  className="nav-link"
                  to={"/home"}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/home");
                    notify("Logged out");

                  }}
                >
                  Logout
                </Link>

              ) : (
                <NavDropdown title="Giriş Yap" id="basic-nav-dropdown" >
                  <a href="/auth" className="dropdown-item">
                    Doktor Giriş
                  </a>
                </NavDropdown>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBars;
