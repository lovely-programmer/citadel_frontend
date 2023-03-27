import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter, BsInstagram } from "react-icons/bs";
import privacyOption from "../../assets/privacyoptions.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__social">
          <div className="social__icon">
            <a href="">
              <FaFacebook />
            </a>
          </div>
          <div className="social__icon">
            <a href="">
              <BsTwitter />
            </a>
          </div>
          <div className="social__icon">
            <a href="">
              <BsInstagram />
            </a>
          </div>
        </div>
        <div className="footer__list desktop">
          <ul>
            <li>
              <a href="">Support</a>
            </li>
            <li>
              <a href="">Site map</a>
            </li>
            <li>
              <a href="">Online tracking & advertising</a>
            </li>
            <li>
              <a href="">CoBrowse</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="">Security</a>
            </li>
            <li>
              <a href="">Careers</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="">Financial</a>
            </li>
            <li>
              <a href="">Accessibility</a>
            </li>
            <li>
              <a href="">
                Your California privacy choice
                <img src={privacyOption} alt="" />
              </a>
            </li>
          </ul>
          <ul className="footer__span">
            <li>
              <span>
                Citadel Choice Bank <br /> 800 Nicollet Mall <br /> Minneapolis,
                MN 55402
              </span>
            </li>
            <li>
              <span>© 2023 Citadel Choice Bank</span>
            </li>
          </ul>
        </div>
        <div className="footer__list mobile__footer">
          <div className="mobile__left">
            <ul>
              <li>
                <a href="">Support</a>
              </li>
              <li>
                <a href="">Financial educationp</a>
              </li>
              <li>
                <a href="">Careers</a>
              </li>
              <li>
                <a href="">Online tracking & advertising</a>
              </li>
              <li>
                <a href="">
                  Your California privacy choice
                  <img src={privacyOption} alt="" />
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="">Security</a>
              </li>
              <li>
                <a href="">Site map</a>
              </li>
              <li>
                <a href="">Accessibility</a>
              </li>
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">CoBrowse</a>
              </li>
            </ul>
          </div>
          <div className="mobile__right">
            <ul className="footer__span">
              <li>
                <span>
                  Citadel Choice Bank <br /> 800 Nicollet Mall <br />
                  Minneapolis, MN 55402
                </span>
              </li>
              <li>
                <span>© 2023 Citadel Choice Bank</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
