import React from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";
import { useState } from "react";
import { useEffect } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdSentimentSatisfiedAlt,
} from "react-icons/md";

export default function RedeemPopup({ popup, setPopup, asset }) {
  const [amount, setAmount] = useState(0);

  const [active, setActive] = useState(0);

  const [open, setOpen] = useState(false);

  const btnPercentages = [0.25, 0.5, 0.75, 1];

  const assets = [
    {
      name: "BTC",
      full: "Bitcoin",
      icon: "images/dashboard/bitcoin.svg",
    },
    {
      name: "ETH",
      full: "Ethereum",
      icon: "images/dashboard/ethereum.svg",
    },
    {
      name: "BNB",
      full: "Binance Coin",
      icon: "images/dashboard/bnb.svg",
    },
    {
      name: "USDC",
      full: "USD Coin",
      icon: "images/dashboard/usdc.svg",
    },
    {
      name: "USDT",
      full: "Tether",
      icon: "images/dashboard/usdt.svg",
    },
  ];

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

  const handleActive = (ind) => {
    setActive(ind);
    setOpen(false);
  };

  useEffect(() => {
    assets.forEach((assetObject, index) => {
      if (assetObject.name === asset) {
        setActive(index);
      }
    });
  }, []);

  return (
    <Modal open={popup !== 0 ? true : false}>
      <section className="redeempopup">
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
            <h1>REDEEM</h1>
            <img
              src="images/close.svg"
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
              {open ? (
                <div className="opencontainer">
                  <div className="absolutecontainer">
                    {assets.map((assetObject, index) => (
                      <>
                        {active === index && (
                          <div
                            className={
                              active === index
                                ? "assetcontainer active"
                                : "assetcontainer"
                            }
                            onClick={() => handleActive(index)}
                          >
                            <div className="left">
                              <img
                                src={assetObject.icon}
                                alt={assetObject.name}
                                width={30}
                                height={30}
                              />
                              <span>
                                <h3>{assetObject.name}</h3>
                                <h4>{assetObject.full}</h4>
                              </span>
                            </div>
                            {active === index && <MdKeyboardArrowDown />}
                          </div>
                        )}
                      </>
                    ))}
                    {assets.map((assetObject, index) => (
                      <>
                        {active !== index && (
                          <div
                            className={
                              active === index
                                ? "assetcontainer active"
                                : "assetcontainer"
                            }
                            onClick={() => handleActive(index)}
                          >
                            <div className="left">
                              <img
                                src={assetObject.icon}
                                alt={assetObject.name}
                                width={30}
                                height={30}
                              />
                              <span>
                                <h3>{assetObject.name}</h3>
                                <h4>{assetObject.full}</h4>
                              </span>
                            </div>
                            {active === index && <MdKeyboardArrowDown />}
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {assets.map((assetObject, index) => (
                    <>
                      {index === active && (
                        <div
                          className="assetcontainer"
                          onClick={() => setOpen((open) => !open)}
                        >
                          <div className="left">
                            <img
                              src={assetObject.icon}
                              alt={assetObject.name}
                              width={30}
                              height={30}
                            />
                            <span>
                              <h3>{assetObject.name}</h3>
                              <h4>{assetObject.full}</h4>
                            </span>
                          </div>
                          {!open ? (
                            <MdKeyboardArrowUp />
                          ) : (
                            <MdKeyboardArrowDown />
                          )}
                        </div>
                      )}
                    </>
                  ))}
                </>
              )}
            </span>
            <span className="available">
              <h3>Available</h3>
              <h2>0</h2>
              <h4>Next rewards in 1 days at 00:00 UTC</h4>
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
            <span className="delegatebox">
              <button
                className={amount > 0.0 ? "delegate" : "delegate disable"}
                onClick={handleSubmit}
                disabled={amount > 0.0 ? false : true}
              >
                REDEEM
              </button>
            </span>
            <span className="warningbox">
              <div className="b">
                <p>Redemptions are currently disabled for this portfolio</p>
              </div>
            </span>
          </div>
        </div>
      </section>
    </Modal>
  );
}
