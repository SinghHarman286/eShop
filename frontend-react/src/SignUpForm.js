import React, { useState, useEffect } from "react";
import SimpleInputHook from "./hooks/SimpleInputHook";
import axios from "axios";

export default (props) => {
  const [emailVal, handleEmailChange, resetEmailValue] = SimpleInputHook("");
  const [passwordVal, handlePasswordChange, resetPasswordlValue] = SimpleInputHook("");
  const [passwordConfirmVal, handlepasswordConfirmChange, resetpasswordConfirmValue] = SimpleInputHook("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:4000/signup", {
        emailVal,
        passwordVal,
        passwordConfirmVal,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res.data.signup) {
      props.history.push("/login");
    } else {
      alert(res.data.message);
      resetPasswordlValue();
      resetpasswordConfirmValue();
    }
  };

  return (
    <div>
      <form className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email:</label>
        <input value={emailVal} onChange={handleEmailChange} id="email" placeholder="email" className="form-control" required />
        <label htmlFor="password">Enter Password:</label>
        <input value={passwordVal} onChange={handlePasswordChange} id="password" placeholder="password" className="form-control" required />
        <label htmlFor="password-confirm">Confirm Password:</label>
        <input value={passwordConfirmVal} onChange={handlepasswordConfirmChange} id="password-confirm" placeholder="confirm password" className="form-control" required />
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};
