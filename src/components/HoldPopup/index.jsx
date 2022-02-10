import React from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import { useEffect } from "react";

export default function HoldPopup({ popup, setPopup, asset }) {
  const [amount, setAmount] = useState(0);

  const btnPercentages = [0.25, 0.5, 0.75, 1];

  const handleClose = () => {
    setPopup(0);
  };

  const handleChange = (e) => {
    setAmount(parseFloat(e.target.value));
  };

  const handleCheck = () => {
    if (amount < 0.0001) {
      setAmount(0.0001);
    } else if (amount > 10000) {
      setAmount(10000);
    }
  };

  const handlePercentage = (index) => {
    let newAmount = parseFloat(amount * btnPercentages[index - 1]);
    newAmount = newAmount + parseFloat(amount);

    if (newAmount > 10000) {
      newAmount = 10000;
    }

    setAmount((amount) => parseFloat(newAmount).toFixed(4));
  };

  const handleSubmit = () => {
    console.log("Delegated: " + amount);
  };

  return (
    <Modal open={popup !== 0 ? true : false}>
      <section className="holdpopup">
        <div className="box">
          <div className="headertitle">
            <img
              src="/images/close.svg"
              alt="close"
              width={15}
              height={15}
              onClick={handleClose}
              className="firstImg"
            />
            <h1>HOLD</h1>
            <img
              src="/images/close.svg"
              alt="close"
              width={15}
              height={15}
              value={amount}
              onClick={handleClose}
            />
          </div>
          <div className="content">
            <span className="asset">
              <h4>Asset</h4>
              <div className="assetcontainer">
                <div className="left">
                  <img
                    src="/images/dashboard/ebct.svg"
                    alt="ebct"
                    width={30}
                    height={30}
                  />
                  <span>
                    <h3>EBCT</h3>
                    <h4>EBCT token</h4>
                  </span>
                </div>
                <div className="right">
                  <div className="imgbox">
                    <img
                      src="/images/header/info.svg"
                      alt="info"
                      width={20}
                      height={20}
                    />
                  </div>

                  <div
                    className="infotip
                  "
                  >
                    Upgrade your membership tier and earn additional rewards
                  </div>
                </div>
              </div>
            </span>
            <span className="available">
              <h3>Available</h3>
              <h2>0</h2>
            </span>
            <span className="amount">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={handleChange}
                onBlur={handleCheck}
              />
              <div className="btnrow">
                <button onClick={() => handlePercentage(1)}>25%</button>
                <button onClick={() => handlePercentage(2)}>50%</button>
                <button onClick={() => handlePercentage(3)}>75%</button>
                <button onClick={() => handlePercentage(4)}>100%</button>
              </div>
            </span>
            <span className="rewards">
              <h4>Rewards paid daily</h4>
            </span>
            <span className="delegatebox">
              <button
                className={amount > 0.0 ? "delegate" : "delegate disable"}
                onClick={handleSubmit}
                disabled={amount > 0.0 ? false : true}
              >
                DELEGATE
              </button>
            </span>
          </div>
        </div>
      </section>
    </Modal>
  );
}
