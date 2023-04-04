import React from "react";

function Address({ address, city, state, zip_code, updateFields }) {
  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Residential Address</h3>
      <div className="form__group">
        <input
          value={address}
          onChange={(e) => updateFields({ address: e.target.value })}
          required
          id="address"
          name="address"
          type="text"
        />
        <label htmlFor="address">Street Address</label>
      </div>

      <div className="form__group">
        <input
          value={city}
          onChange={(e) => updateFields({ city: e.target.value })}
          required
          id="city"
          name="city"
          type="text"
        />
        <label htmlFor="city">City</label>
      </div>

      <div className="form__group">
        <input
          value={state}
          onChange={(e) => updateFields({ state: e.target.value })}
          required
          id="state"
          name="state"
          type="text"
        />
        <label htmlFor="state">State</label>
      </div>

      <div className="form__group">
        <input
          value={zip_code}
          onChange={(e) => updateFields({ zip_code: e.target.value })}
          required
          id="zip_code"
          name="zip_code"
          type="text"
        />
        <label htmlFor="zip_code">Zip Code</label>
      </div>
    </div>
  );
}

export default Address;
