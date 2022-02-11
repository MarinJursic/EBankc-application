/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import "../styles.scss";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/authActions";

import Alert from "../../../components/Alert";

import Input from "../Input";

function Signup() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();

  const checkForErrors = () => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const passwordValid = password !== null && password.length >= 6;
    const confirmPasswordValid = confirmPassword === password;
    const emailValid = email !== null && re.test(email);

    setPasswordError(
      !passwordValid ? "Password should be atleast 6 characters long" : null
    );

    setConfirmPasswordError(
      !confirmPasswordValid ? "Passwords must match" : null
    );

    setEmailError(!emailValid ? "Invalid Email Address" : null);

    return passwordValid && emailValid && confirmPasswordValid;
  };

  const handleSignup = () => {
    const user = { email, password };

    if (checkForErrors()) {
      dispatch(registerUser(user));
    }
  };

  useEffect(() => {
    isAuth && navigate("/dashboard");
  }, [isAuth]);

  return (
    <main className="login">
      <section className="box">
        <h2>SIGN UP</h2>
        <p>Create your EBankc account</p>
        <Input
          label="Email"
          img="email.svg"
          setValue={setEmail}
          isPassword={false}
          type="email"
        />
        {emailError && <Alert text={emailError} error={true} />}
        <Input
          label="Password"
          img="lock.svg"
          setValue={setPassword}
          isPassword={true}
          type="text"
        />
        {passwordError && <Alert text={passwordError} error={true} />}
        <Input
          label="Confirm password"
          img="lock.svg"
          setValue={setConfirmPassword}
          isPassword={true}
          type="text"
        />
        {confirmPasswordError && (
          <Alert text={confirmPasswordError} error={true} />
        )}
        <div className="buttons">
          <button onClick={handleSignup}>SIGN UP</button>
          <Link to="/login">
            <button className="signupButton">LOG IN</button>
          </Link>
        </div>
        <div className="bottom">
          <p>
            By continuing, you agree to Yield {"App's"}
            <span>
              {" "}
              <Link to="/terms">Terms of Use</Link>{" "}
            </span>
            and
            <span>
              {" "}
              <Link to="/privacy_policy">Privacy Policy</Link>
            </span>
          </p>
          <p>
            Already have an account?
            <span>
              {" "}
              <Link to="/login">Log in</Link>
            </span>
          </p>
        </div>
      </section>
      <p>{"©"} 2022. All rights reserved.</p>
    </main>
  );
}

export default Signup;
