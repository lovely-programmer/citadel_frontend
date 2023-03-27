import "./Help.css";

function Help() {
  return (
    <div className="help">
      <div className="help__container">
        <h1>What can we help you with?</h1>

        <div className="help__content">
          <ul>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock.coreimg.svg/1664561537381/icon-checking-orange.svg"
                alt=""
              />
              <span>Checking</span>
            </li>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock_copy.coreimg.svg/1664561537410/icon-creditcards-orange.svg"
                alt=""
              />
              <span>Credit Cards</span>
            </li>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock_copy_17.coreimg.svg/1664561537443/icon-savings-orange.svg"
                alt=""
              />
              <span>Savings</span>
            </li>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock_copy_70.coreimg.svg/1664561537470/icon-home-orange.svg"
                alt=""
              />
              <span>Mortgage</span>
            </li>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock_copy_18.coreimg.svg/1664561537497/icon-retirement-orange.svg"
                alt=""
              />
              <span>Retirement</span>
            </li>
            <li>
              <img
                src="https://www.pnc.com/en/personal-banking/_jcr_content/main/pageBody/containergrid_120638/embeddedGrid/contentblock_copy_14.coreimg.svg/1664561537523/icon-auto-loans-orange.svg"
                alt=""
              />
              <span>Auto Loans</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Help;
