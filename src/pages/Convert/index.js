import React, { useState, useEffect } from "react";
import "./styles.scss";
import Header from "../../components/Header";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function Convert() {
  const [amount, setAmount] = useState(0);

  const [activeFrom, setActiveFrom] = useState(0);
  const [activeTo, setActiveTo] = useState(3);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

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

  const handleActiveFrom = (ind) => {
    setActiveFrom(ind);
    setOpenFrom(false);
  };

  const handleActiveTo = (ind) => {
    setActiveTo(ind);
    setOpenTo(false);
  };

  useEffect(() => {
    openFrom && setOpenTo(false);
  }, [openFrom]);

  useEffect(() => {
    openTo && setOpenFrom(false);
  }, [openTo]);

  return (
    <main className="convert">
      <Header page="Convert" />
      <section className="box">
        <section className="asset">
          <h4>From</h4>
          {openFrom ? (
            <div className="opencontainer">
              <div className="absolutecontainer">
                {assets.map((assetObject, index) => {
                  if (index === activeTo) return null;

                  return (
                    <>
                      {activeFrom === index && (
                        <div
                          className={
                            activeFrom === index
                              ? "assetcontainer active"
                              : "assetcontainer"
                          }
                          onClick={() => handleActiveFrom(index)}
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
                          {activeFrom === index && <MdKeyboardArrowDown />}
                        </div>
                      )}
                    </>
                  );
                })}
                {assets.map((assetObject, index) => {
                  if (index === activeTo) return null;

                  return (
                    <>
                      {activeFrom !== index && (
                        <div
                          className={
                            activeFrom === index
                              ? "assetcontainer active"
                              : "assetcontainer"
                          }
                          onClick={() => handleActiveFrom(index)}
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
                          {activeFrom === index && <MdKeyboardArrowDown />}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <>
                {assets.map((assetObject, index) => (
                  <>
                    {index === activeFrom && (
                      <div
                        className="assetcontainer"
                        onClick={() => setOpenFrom((openFrom) => !openFrom)}
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
                        {!openFrom ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </div>
                    )}
                  </>
                ))}
              </>
            </div>
          ) : (
            <>
              {assets.map((assetObject, index) => (
                <>
                  {index === activeFrom && (
                    <div
                      className="assetcontainer"
                      onClick={() => setOpenFrom((openFrom) => !openFrom)}
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
                      {!openFrom ? (
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
          <p>1 {assets[activeFrom].name} = $1.00</p>
        </section>
        <section className="asset">
          <h4>To</h4>
          {openTo ? (
            <div className="opencontainer">
              <div className="absolutecontainer">
                {assets.map((assetObject, index) => {
                  if (index === activeFrom) return null;

                  return (
                    <>
                      {activeTo === index && (
                        <div
                          className={
                            activeTo === index
                              ? "assetcontainer active"
                              : "assetcontainer"
                          }
                          onClick={() => handleActiveTo(index)}
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
                          {activeTo === index && <MdKeyboardArrowDown />}
                        </div>
                      )}
                    </>
                  );
                })}
                {assets.map((assetObject, index) => {
                  if (index === activeFrom) return null;

                  return (
                    <>
                      {activeTo !== index && (
                        <div
                          className={
                            activeTo === index
                              ? "assetcontainer active"
                              : "assetcontainer"
                          }
                          onClick={() => handleActiveTo(index)}
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
                          {activeTo === index && <MdKeyboardArrowDown />}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              <>
                {assets.map((assetObject, index) => (
                  <>
                    {index === activeTo && (
                      <div
                        className="assetcontainer"
                        onClick={() => setOpenTo((openTo) => !openTo)}
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
                        {!openTo ? (
                          <MdKeyboardArrowUp />
                        ) : (
                          <MdKeyboardArrowDown />
                        )}
                      </div>
                    )}
                  </>
                ))}
              </>
            </div>
          ) : (
            <>
              {assets.map((assetObject, index) => (
                <>
                  {index === activeTo && (
                    <div
                      className="assetcontainer"
                      onClick={() => setOpenTo((openTo) => !openTo)}
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
                      {!openTo ? (
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
          <p>1 {assets[activeTo].name} = $1.00</p>
        </section>

        <section className="available">
          <h4>Available</h4>
          <h3>0 {assets[activeFrom].name}</h3>
        </section>

        <section className="bottom">
          <h4>{assets[activeFrom].name} spent</h4>
          <input placeholder="0.0000" />
          <button>GET QUOTE</button>
          <div className="max">
            <p>
              Max = <span>$5,000.00</span>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Convert;
