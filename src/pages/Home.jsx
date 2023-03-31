import Banner from "../components/Banner/Banner";
import Help from "../components/Help/Help";
import Learn from "../components/Learn/Learn";
import Mobile from "../components/Mobile/Mobile";
import Navbar from "../components/Navbar/Navbar";
import Support from "../components/Support/Support";
import Disclosures from "../components/Disclosure/Disclosures";
import Footer from "../components/Footer/Footer";
import { SiChatbot } from "react-icons/si";
import Chat from "../components/Chat/HomeChat1";
import { BsBoxArrowDown } from "react-icons/bs";
import { useState } from "react";

function Home() {
  const [showChat, setShowChat] = useState(false);
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

      <div className="show__cat">{showChat && <Chat />}</div>
      <div className="chatbot">
        {showChat ? (
          <div onClick={() => setShowChat(false)} className="chatbot__svg">
            <BsBoxArrowDown />
          </div>
        ) : (
          <div onClick={() => setShowChat(true)} className="chatbot__svg">
            <SiChatbot />
          </div>
        )}
        {/* {showChat ? <BsBoxArrowDown /> : <SiChatbot />} */}
      </div>
    </div>
  );
}

export default Home;
