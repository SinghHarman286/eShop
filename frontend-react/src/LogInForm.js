import React, { useState, useEffect } from "react";
import SimpleInputHook from "./hooks/SimpleInputHook";
import axios from "axios";

export default ({ handleAuth }) => {
  const [emailVal, handleEmailChange, resetEmailValue] = SimpleInputHook("");
  const [passwordVal, handlePasswordChange, resetPasswordlValue] = SimpleInputHook("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:4000/login", {
        emailVal,
        passwordVal,
      })
      .catch((err) => {
        console.log(err);
      });

    if (res.data.auth) {
      localStorage.setItem("token", res.data.accessToken);
      handleAuth();
    } else {
      alert(res.data.message);
      resetEmailValue();
      resetPasswordlValue();
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email:</label>
        <input value={emailVal} onChange={handleEmailChange} id="email" placeholder="email" className="form-control" required />
        <label htmlFor="password">Enter Password:</label>
        <input value={passwordVal} onChange={handlePasswordChange} id="password" placeholder="password" className="form-control" required />
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};
