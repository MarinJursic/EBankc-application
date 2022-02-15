/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import { useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { borrowAsset } from "../../actions/authActions";

import Alert from "../Alert";

import { motion } from "framer-motion";

function Dropdown({ open, setOpen, data, active, setActive }) {
  const dropdownVariants = {
    open: { opacity: 1, display: "flex" },
    closed: { opacity: 0, display: "none" },
  };

  return (
    <div
      className="dropdown"
      onClick={() => setOpen(!open)}
      style={
        open
          ? {
              boxShadow: "rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
            }
          : undefined
      }
    >
      <p>{data[active]}</p>
      <MdKeyboardArrowDown />
      <motion.div
        className="dropdownData"
        animate={open ? "open" : "closed"}
        variants={dropdownVariants}
        transition={{ duration: 0.2 }}
      >
        {data.map((val, i) => (
          <p
            key={i}
            className={i === active ? "active" : undefined}
            onClick={() => setActive(i)}
          >
            {val}
          </p>
        ))}
      </motion.div>
    </div>
  );
}

export default function BorrowPopup({ popup, setPopup }) {
  const user = useSelector((state) => state.auth.user);
  const prices = useSelector((state) => state.price.prices);

  const dispatch = useDispatch();

  const [assetAmount, setAssetAmount] = useState(0);
  const [collateralAmount, setCollateralAmount] = useState(0);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [error, setError] = useState(null);

  const [activeAsset, setActiveAsset] = useState(1);
  const [activeCollateral, setActiveCollateral] = useState(0);

  const truncate = (amount) => {
    let truncated = Math.trunc(amount);

    if (parseFloat(amount - truncated) >= parseFloat(0.000001)) {
      return amount.toFixed(5);
    } else {
      return Math.round(amount);
    }
  };

  const assets = [
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
  ];

  const collaterals = [
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
  ];

  const handleClose = () => {
    setPopup(0);
  };

  const handleChange = (e) => {
    let amount = parseFloat(e.target.value);

    let collateralVal = prices[collaterals[activeCollateral].name];

    setAssetAmount(amount);
    setCollateralAmount((2 * amount) / collateralVal || 0);
  };

  const handleSubmit = () => {
    let asset = assets[activeAsset].name;
    let collateral = collaterals[activeCollateral].name;

    let available = user.wallet.assets[collateral].wallet;

    if (collateralAmount > available) {
      setError("Not enough funds.");
      return null;
    } else if (assetAmount < 5000) {
      setError("Minimum deposit amount is $50,000.");
      return null;
    }

    setError(null);
    dispatch(borrowAsset(collateral, collateralAmount, asset, assetAmount));
  };

  return (
    <Modal open={popup !== 0 ? true : false}>
      <section className="earnpopup">
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
            <h1>BORROW</h1>
            <img
              src="/images/close.svg"
              alt="close"
              width={15}
              height={15}
              onClick={handleClose}
            />
          </div>
          <div className="body">
            <label>Credit Amount</label>
            <div className="inputContainer">
              <p>$</p>
              <input
                placeholder="5000"
                defaultValue={assetAmount}
                onChange={handleChange}
              />
              <Dropdown
                open={openDropdown === 0}
                setOpen={(open) => setOpenDropdown(open ? 0 : null)}
                data={assets.map((asset) => asset.name)}
                active={activeAsset}
                setActive={setActiveAsset}
              />
            </div>
            <label>Collateral Required</label>
            <div className="inputContainer">
              <p className="collateralAmount">{truncate(collateralAmount)}</p>

              <Dropdown
                open={openDropdown === 1}
                setOpen={(open) => setOpenDropdown(open ? 1 : null)}
                data={collaterals.map((asset) => asset.name)}
                active={activeCollateral}
                setActive={setActiveCollateral}
              />
            </div>
            {error && <Alert text={error} error={true} />}
            <button onClick={handleSubmit}>Borrow</button>
          </div>
        </div>
      </section>
    </Modal>
  );
}
