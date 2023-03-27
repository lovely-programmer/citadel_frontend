import "./Banner.css";

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
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
