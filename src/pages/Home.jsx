import Banner from "../components/Banner/Banner";
import Help from "../components/Help/Help";
import Learn from "../components/Learn/Learn";
import Mobile from "../components/Mobile/Mobile";
import Navbar from "../components/Navbar/Navbar";
import Support from "../components/Support/Support";
import Disclosures from "../components/Disclosure/Disclosures";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Help />
      <Support />
      <Mobile />
      <Learn />
      <Disclosures />
      <Footer />
    </div>
  );
}

export default Home;
