import React, { useState, useEffect } from "react";
import "../../styles.scss";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../actions/authActions";

import ReactCodeInput from "react-code-input";

import Alert from "../../../../components/Alert";

export default function TwoFactorAuth({ user }) {
  const dispatch = useDispatch();
  const twoFactorAuthEnabled = useSelector(
    (state) => state.auth.twoFactorAuthEnabled
  );

  const [code, setCode] = useState(null);
  const [error, setError] = useState(null);

  const checkForErrors = () => {
    if (code && code.length === 6) {
      setError(null);
      setCode(null);
      return true;
    }

    setError("Invalid code");
    return false;
  };

  const handleContinue = () => {
    if (checkForErrors()) {
      dispatch(loginUser(user));
    }
  };

  useEffect(() => {
    if (!twoFactorAuthEnabled) dispatch(loginUser(user));
  }, [twoFactorAuthEnabled]);

  return (
    <main className="login">
      <section className="box">
        <h2>2FA CODE</h2>
        <p>
          Please enter the verification code from Google Authenticator or Authy
        </p>
        <ReactCodeInput
          type="number"
          fields={6}
          onChange={(val) => setCode(val)}
          autoFocus={false}
        />
        {error && <Alert text={error} error={true} />}
        <div className="buttons">
          <button onClick={handleContinue}>CONTINUE</button>
        </div>
        <div className="bottom">
          <p>
            <span>
              <Link to="/lost-device">Lost access to device?</Link>
            </span>
          </p>
        </div>
      </section>
      <p>{"©"} 2022. All rights reserved.</p>
    </main>
  );
}
