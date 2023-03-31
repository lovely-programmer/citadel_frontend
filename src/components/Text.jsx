function Text() {
  return (
    <div
      style={{
        marginRight: "auto",
        marginLeft: "auto",
        width: "50%",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "15px" }}>Dear Osas Code</h2>

        <p
          style={{
            marginBottom: "15px",
            fontSize: "18px",
            color: "blue",
          }}
        >
          You have successfully loggedin in to your account on date
        </p>

        <p
          style={{
            marginBottom: "35px",
            fontSize: "18px",
            lineHeight: "26px",
          }}
        >
          If If you did not initiate the login in please chat with us via
          Whatsapp on +1 (831) 401-4352 or send an email to
          customerservice@example.com
        </p>

        <p style={{ fontSize: "14px", marginBottom: "35px" }}>
          Thankyou for choosing CCB
        </p>

        <p>
          Please note that CCB WILL NEVER ASK YOU FOR YOUR OR ACCOUNT DETAILS
        </p>
      </div>
    </div>
  );
}

export default Text;
