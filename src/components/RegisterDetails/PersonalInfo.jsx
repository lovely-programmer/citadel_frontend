import React from "react";
import { data } from "./data";

function PersonalInfo({ name, occupation, country, updateFields }) {
  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Personal Info</h3>
      <div className="form__group">
        <input
          required
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => updateFields({ name: e.target.value })}
        />
        <label htmlFor="name">Full Name</label>
      </div>

      <div className="form__group">
        <input
          required
          type="text"
          id="occupation"
          name="occupation"
          value={occupation}
          onChange={(e) => updateFields({ occupation: e.target.value })}
        />
        <label htmlFor="occupation">Occupation</label>
      </div>

      <div className="form__group">
        <select
          required
          onChange={(e) => updateFields({ country: e.target.value })}
          value={country}
          name="country"
        >
          <option value="">Select Country</option>
          {data.map((d, i) => (
            <option key={i} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PersonalInfo;
