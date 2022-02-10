import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import "./styles.scss";
import KycPopup from "../KycPopup";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function DepositPopup({ popup, setPopup, type }) {
  const [verified] = useState(true);

  const [amount, setAmount] = useState(0);

  const [active, setActive] = useState(0);
  const [address, setAddress] = useState("");

  const [open, setOpen] = useState(false);

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

  const handleSubmit = () => {
    console.log("Delegated: " + amount);
  };

  const networks = [
    {
      name: "ERC 20",
      full: "Ethereum Mainnet",
      icon: "images/dashboard/ethereum.svg",
    },
  ];

  const assets = [
    {
      name: "BTC",
      full: "Bitcoin",
      icon: "images/dashboard/bitcoin.svg",
      min: 0.01,
    },
    {
      name: "ETH",
      full: "Ethereum",
      icon: "images/dashboard/ethereum.svg",
      min: 0.1,
    },
    {
      name: "BNB",
      full: "Binance Coin",
      icon: "images/dashboard/bnb.svg",
      min: 100,
    },
    {
      name: "USDC",
      full: "USD Coin",
      icon: "images/dashboard/usdc.svg",
      min: 100,
    },
    {
      name: "USDT",
      full: "Tether",
      icon: "images/dashboard/usdt.svg",
      min: 100,
    },
  ];

  const handleClose = () => {
    setPopup(0);
  };

  const handleActive = (ind) => {
    setActive(ind);
    setOpen(false);
  };

  const withdrawPopup = () => {
    return (
      <Modal open={popup !== 0 ? true : false}>
        <section className="withdrawpopup">
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
              <h1>WITHDRAW</h1>
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
              </span>
              <span className="amount">
                <label>Destination Address</label>
                <input
                  type="string"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </span>
              <span className="amount">
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={handleChange}
                  onBlur={handleCheck}
                />
              </span>
              <span className="delegatebox">
                <button
                  className={amount > 0.0 ? "delegate" : "delegate disable"}
                  onClick={handleSubmit}
                  disabled={amount > 0.0 ? false : true}
                >
                  WITHDRAW
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
  };

  const depositPopup = () => {
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
              <h1>DEPOSIT</h1>
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
              {assets[active].name === "ETH" && (
                <span className="asset">
                  <h4>Network</h4>
                  <div className="assetcontainer">
                    <div className="left">
                      <img
                        src={networks[0].icon}
                        alt={networks[0].name}
                        width={30}
                        height={30}
                      />
                      <span>
                        <h3>{networks[0].name}</h3>
                        <h4>{networks[0].full}</h4>
                      </span>
                    </div>
                  </div>
                </span>
              )}
              <span className="qrcode">
                <div className="boxcode">
                  <img
                    src="/images/qrcode.svg"
                    alt="code"
                    width={35}
                    height={35}
                  />
                  <p>
                    A QR Code address will appear here once you've made your
                    selections
                  </p>
                </div>
              </span>
              <span className="warningbox">
                <div className="b">
                  <p>
                    <strong>Minimum Amount: </strong>
                    {assets[active].min} {assets[active].name}
                    <br />
                    Any amount below the minimum amount won't be credited or
                    refunded
                  </p>
                </div>
              </span>
            </div>
          </div>
        </section>
      </Modal>
    );
  };

  return (
    <>
      {verified ? (
        <>{type === "deposit" ? depositPopup() : withdrawPopup()}</>
      ) : (
        <KycPopup popup={popup} setPopup={setPopup} />
      )}
    </>
  );
}
