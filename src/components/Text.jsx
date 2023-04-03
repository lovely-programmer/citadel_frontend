import axios from "axios";
import { useEffect, useState } from "react";

function Text() {
  const device = navigator.userAgent;
  const [ip, setIp] = useState();

  useEffect(() => {
    const getIp = async () => {
      try {
        const res = await axios.get("http://api.ipify.org/");
        setIp(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getIp();
  }, []);

  return (
    <div
      style={{
        marginRight: "auto",
        marginLeft: "auto",
        width: "50%",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "15px" }}>Welcome!</h2>
        <p style={{ marginBottom: "10px" }}>Hello, Mark</p>

        <p style={{ marginBottom: "20px" }}>
          We notice you just login your account from an unauthorized browser
        </p>

        <table style={{ marginBottom: "15px" }}>
          <tbody>
            <tr>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}>
                Device
              </td>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}>
                {device}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}>
                IP Address
              </td>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}>
                {ip}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}>
                Date
              </td>
              <td style={{ padding: "4px", border: "1px solid #b5a4a4" }}></td>
            </tr>
          </tbody>
        </table>

        <p style={{ fontSize: "14px", marginBottom: "35px" }}>
          Thankyou for choosing Citadel Choice Bank
        </p>

        <p>
          Please note that Citadel Choice Bank WILL NEVER ASK YOU FOR YOUR OR
          ACCOUNT DETAILS
        </p>
      </div>
    </div>
  );
}

export default Text;
