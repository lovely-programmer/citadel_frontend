import React from "react";

function Account({
  username,
  phoneNumber,
  account_type,
  email,
  updateFields,
  password,
  confirmPassword,
}) {
  return (
    <div>
      <h3 style={{ marginBottom: "15px" }}>Create Login</h3>
      <div className="form__group">
        <input
          value={email}
          onChange={(e) => updateFields({ email: e.target.value })}
          required
          id="email"
          name="email"
          type="text"
        />
        <label htmlFor="email">Email</label>
      </div>

      <div className="form__group">
        <input
          value={phoneNumber}
          onChange={(e) => updateFields({ phoneNumber: e.target.value })}
          required
          id="phoneNumber"
          name="phoneNumber"
          type="text"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
      </div>

      <div className="form__group">
        <input
          required
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => updateFields({ username: e.target.value })}
        />
        <label htmlFor="username">Username</label>
      </div>

      <div className="form__group">
        <select
          onChange={(e) => updateFields({ account_type: e.target.value })}
          value={account_type}
          name="account_type"
          required
        >
          <option value="">Select Account</option>
          <option value="Savings">Savings</option>
          <option value="Checking">Checking</option>
          <option value="Investment">Investment</option>
        </select>
      </div>

      <div className="form__group">
        <input
          required
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => updateFields({ password: e.target.value })}
        />
        <label htmlFor="username">Password</label>
      </div>

      <div className="form__group">
        <input
          required
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => updateFields({ confirmPassword: e.target.value })}
        />
        <label htmlFor="username">Confirm Password</label>
      </div>
    </div>
  );
}

export default Account;
