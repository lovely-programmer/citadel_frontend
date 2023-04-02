import "./Banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <div className="banner__container">
        <div className="banner__image">
          <div className="banner__content">
            <div className="banner__card">
              <h1>Change The way you bank</h1>
              <span>
                Take the next step with CCB checking, savings and financial
                tools designed to go wherever you do.
              </span>
              <Link to="/signup">
                <button>Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
