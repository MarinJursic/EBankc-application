import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";

export default function DepositPopup({ popup, setPopup }) {
  const handleClose = () => {
    setPopup(0);
  };

  return (
    <Modal open={popup !== 0 ? true : false}>
      <section className="depositpopup">
        <div className="box">
          <div className="headertitle">
            <img
              src="images/close.svg"
              alt="close"
              width={15}
              height={15}
              onClick={handleClose}
              className="firstImg"
            />
            <h1>KYC REQUIRED</h1>
            <img
              src="images/close.svg"
              alt="close"
              width={15}
              height={15}
              onClick={handleClose}
            />
          </div>
          <div className="content">
            <p>
              Please verify your identity with us. It helps to ensure your
              account is secure and in compliance with the law.
            </p>
            <button>BEGIN KYC</button>
          </div>
        </div>
      </section>
    </Modal>
  );
}
