/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import { useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { redeemAsset } from "../../actions/authActions";

export default function RepayPopup({ popup, setPopup }) {
  const user = useSelector((state) => state.auth.user);

  const [assetAmount, setAssetAmount] = useState(0);

  const [amount, setAmount] = useState(0);

  const btnPercentages = [0.25, 0.5, 0.75, 1];

  const assets = [
    {
      name: "BTC",
      full: "Bitcoin",
      icon: "/images/dashboard/bitcoin.svg",
    },
    {
      name: "ETH",
      full: "Ethereum",
      icon: "/images/dashboard/ethereum.svg",
    },
    {
      name: "BNB",
      full: "Binance Coin",
      icon: "/images/dashboard/bnb.svg",
    },
    {
      name: "USDC",
      full: "USD Coin",
      icon: "/images/dashboard/usdc.svg",
    },
    {
      name: "USDT",
      full: "Tether",
      icon: "/images/dashboard/usdt.svg",
    },
    {
      name: "EBCT",
      full: "EBankc Coin",
      icon: "/images/dashboard/ebct.svg",
    },
  ];

  const handleClose = () => {
    setPopup(0);
  };

  const handleChange = (e) => {
    setAssetAmount(parseFloat(e.target.value));

    console.log(assetAmount);
  };

  const handlePercentage = (index) => {
    let newAmount = user.wallet.assets["USDT"].wallet;

    newAmount = newAmount * btnPercentages[index - 1];

    setAssetAmount(newAmount);
  };

  return (
    <Modal open={popup !== 0 ? true : false}>
      <section className="repaypopup">
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
            <h1>REPAY LOAN</h1>
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
              <h4>Repayment Amount</h4>
              <div className="inputContainer">
                <input
                  placeholder="0.00"
                  value={assetAmount ? assetAmount : undefined}
                  onChange={handleChange}
                />
                <div className="right">
                  <button onClick={() => handlePercentage(4)}>Max</button>
                  <img
                    src="/images/dashboard/usdt.svg"
                    alt="usdt"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </span>
            <span className="debt">
              <div className="debtbox">
                <h5>Total Debt</h5>
                <h4>{user.wallet.assets["USDT"].wallet} USDT</h4>
              </div>
              <div className="debtbox">
                <h5>Your Free Asset</h5>
                <h4>{user.wallet.assets["USDT"].wallet} USDT</h4>
              </div>
            </span>
            <span className="amount">
              <div className="btnrow">
                <button onClick={() => handlePercentage(1)}>25%</button>
                <button onClick={() => handlePercentage(2)}>50%</button>
                <button onClick={() => handlePercentage(3)}>75%</button>
                <button onClick={() => handlePercentage(4)}>100%</button>
              </div>
            </span>
            <span className="repayinfo">
              <div className="repayrow">
                <h4>Interest Repaid</h4>
                <h4>30 USDT</h4>
              </div>
              <div className="repayrow">
                <h4>Principal Repaid</h4>
                <h4>5000 USDT</h4>
              </div>
              <div className="repayrow">
                <h4>Total Repaid</h4>
                <h4>5030 USDT</h4>
              </div>
              <div className="repayrow">
                <h4>LTV</h4>
                <h4>50%</h4>
              </div>
            </span>
            <span className="delegatebox">
              <button
                className={amount > 0.0 ? "delegate" : "delegate disable"}
                disabled={amount > 0.0 ? false : true}
              >
                Confirm Repay
              </button>
            </span>
          </div>
        </div>
      </section>
    </Modal>
  );
}
