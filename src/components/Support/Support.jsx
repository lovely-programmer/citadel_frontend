import "./Support.css";
import Retire from "../../assets/retire.jpg";
import Plan from "../../assets/plan.jpeg";
import Adapt from "../../assets/adapt.jpeg";

function Support() {
  return (
    <div className="support">
      <div className="support__container container">
        <div className="support__card">
          <div className="support__card-head">
            <img src={Plan} alt="" />
          </div>
          <div className="support__card-base">
            <h2>Spend less. Save more. Relax more.</h2>
            <p>
              Discover tools and tips to help make buying or refinancing a
              little easier
            </p>
          </div>
        </div>
        <div className="support__card">
          <div className="support__card-head">
            <img src={Adapt} alt="" />
          </div>
          <div className="support__card-base">
            <h2>Assess. Adapt. Breathe easy.</h2>
            <p>
              Learn ways to help deal with unexpected expenses you’re
              experiencing
            </p>
          </div>
        </div>
        <div className="support__card">
          <div className="support__card-head">
            <img src={Retire} alt="" />
          </div>
          <div className="support__card-base">
            <h2>Save. Invest. Retire well.</h2>
            <p>Discover how to start saving to meet your retirement goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
