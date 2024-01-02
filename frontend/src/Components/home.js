import AboutUs from "../Sections/aboutus";
import Banner from "../Sections/banner";
import Footer from "../Sections/footer";
import NavBars from "../Sections/navbar";
import Services2 from "../Sections/services2";
import ToTop from "../Sections/totop";

function Home() {

  return (
    <div>
      <NavBars  />
      <Banner />
      <AboutUs />
      <Services2 />
      <Footer />
      <ToTop />
    </div>
  );
}

export default Home;
