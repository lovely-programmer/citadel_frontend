import React from "react";

function VerifyIdentity({
  confirm_social,
  social_security,
  date_of_birth,
  updateFields,
}) {
  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Verify your identify</h3>
      <p style={{ marginBottom: "15px" }}>
        We are required by law to collect your Social Security Number / TIN{" "}
      </p>

      <div className="form__group">
        <input
          required
          type="password"
          id="social_security"
          name="social_security"
          value={social_security}
          onChange={(e) => updateFields({ social_security: e.target.value })}
        />
        <label htmlFor="social_security">Social Security Number / TIN</label>
      </div>

      <div className="form__group">
        <input
          required
          type="password"
          id="confirm_social"
          name="confirm_social"
          value={confirm_social}
          onChange={(e) => updateFields({ confirm_social: e.target.value })}
        />
        <label htmlFor="social_security">Confirm SSN / TIN</label>
      </div>

      <div style={{ marginBottom: "10px" }}>Date of birth</div>
      <div className="form__group">
        <input
          required
          value={date_of_birth}
          onChange={(e) => updateFields({ date_of_birth: e.target.value })}
          name="date_of_birth"
          type="date"
          id="date_of_birth"
        />
      </div>
    </div>
  );
}

export default VerifyIdentity;
