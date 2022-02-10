import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./styles.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import WalletMobile from "../WalletMobile";
import HoldPopup from "../../components/HoldPopup";
import RedeemPopup from "../../components/RedeemPopup";
import EarnPopup from "../../components/EarnPopup";
import DepositWithdrawPopup from "../../components/DepositWithdrawPopup";

import { useDispatch, useSelector } from "react-redux";

function Wallet() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.config.isVisible);
  const prices = useSelector((state) => state.price.prices);
  const user = useSelector((state) => state.auth.user);

  const calcAssetWalletValue = (asset, turnToString = true) => {
    const val =
      Math.round(user.wallet.assets[asset].wallet * prices[asset] * 100) / 100;

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetholdingValue = (asset, turnToString = true) => {
    const val =
      Math.round(user.wallet.assets[asset].holding * prices[asset] * 100) / 100;

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetTotalValue = (asset, turnToString = true) => {
    const val =
      calcAssetWalletValue(asset, false) + calcAssetholdingValue(asset, false);

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const [popup, setPopup] = useState(0);
  const [asset, setAsset] = useState(0);

  const [time, setTime] = React.useState("7 days");

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  const assets = [
    {
      name: "BTC",
      icon: "images/dashboard/bitcoin.svg",
    },
    {
      name: "ETH",
      icon: "images/dashboard/ethereum.svg",
    },
    {
      name: "BNB",
      icon: "images/dashboard/bnb.svg",
    },
    {
      name: "USDC",
      icon: "images/dashboard/usdc.svg",
    },
    {
      name: "USDT",
      icon: "images/dashboard/usdt.svg",
    },
  ];

  const [filter, setFilter] = useState({
    asset: 0,
    type: 0,
    status: 0,
    time: 0,
    amount: 0,
  });

  const [transactions, setTransactions] = useState([
    {
      asset: "BTC",
      type: "deposit",
      status: "Success",
      time: new Date("2019-06-29"),
      amount: 1.52662,
    },
    {
      asset: "ETH",
      type: "deposit",
      status: "Fail",
      time: new Date("2019-06-18"),
      amount: 0.012356,
    },
    {
      asset: "EBCT",
      type: "deposit",
      status: "Success",
      time: new Date("2019-06-28"),
      amount: 0.03456,
    },
  ]);

  const handleSort = (index) => {
    var keys = Object.keys(filter);
    const trueIndex = index - 1;
    let tempFilter = JSON.parse(JSON.stringify(filter));
    if (tempFilter[keys[trueIndex]] === 2) {
      tempFilter[keys[trueIndex]] = 0;
    } else {
      tempFilter[keys[trueIndex]] = tempFilter[keys[trueIndex]] + 1;
    }

    // eslint-disable-next-line array-callback-return
    keys.map((key, keyIndex) => {
      if (keyIndex === trueIndex) {
        return null;
      } else {
        tempFilter[key] = 0;
      }
    });
    setFilter(tempFilter);
  };

  useEffect(() => {
    let tempTransactions = [];
    let keys = Object.keys(filter);
    let filterBy;
    let order;
    let blacklist = [];

    // eslint-disable-next-line array-callback-return
    keys.map((key) => {
      if (filter[key] !== 0) {
        filterBy = key;
        order = filter[key];
      }
    });

    if (!filterBy) return null;

    let sortColumn = transactions.map((transaction) => {
      return transaction[filterBy];
    });

    if (filterBy === "amount") {
      if (order === 1) {
        sortColumn.sort(function (a, b) {
          return a - b;
        });
      } else if (order === 2) {
        sortColumn.sort(function (a, b) {
          return b - a;
        });
      }
    } else if (filterBy === "time") {
      if (order === 1) {
        sortColumn.sort((a, b) => a - b);
      } else if (order === 2) {
        sortColumn.sort((a, b) => b - a);
      }
    } else {
      sortColumn.sort();
      if (order === 2) {
        sortColumn.reverse();
      }
    }

    sortColumn.forEach((value) => {
      transactions.forEach((transaction, index) => {
        if (transaction[filterBy] === value && !blacklist.includes(index)) {
          tempTransactions.push(transaction);
          blacklist.push(index);
        }
      });
    });

    setTransactions((transactions) => [...tempTransactions]);
  }, [filter]);

  const handlePopup = (value, assetPassed) => {
    setPopup((popup) => value);
    setAsset((asset) => assetPassed);
  };

  const getPopup = () => {
    switch (popup) {
      case 1:
        return <HoldPopup popup={popup} setPopup={setPopup} asset={asset} />;
      case 2:
        return <RedeemPopup popup={popup} setPopup={setPopup} asset={asset} />;
      case 3:
        return <EarnPopup popup={popup} setPopup={setPopup} asset={asset} />;
      case 4:
        return (
          <DepositWithdrawPopup
            popup={popup}
            setPopup={setPopup}
            type={"deposit"}
          />
        );
      case 5:
        return (
          <DepositWithdrawPopup
            popup={popup}
            setPopup={setPopup}
            type={"withdraw"}
          />
        );
      default:
        break;
    }
  };
  return (
    <main className="wallet">
      <Header page="Wallet" />
      <WalletMobile />
      {popup !== 0 && getPopup()}
      <section className="desktop">
        <div className="leftside">
          <div className="largebox">
            <h3>EBCT</h3>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "start" }}>Asset</th>
                  <th>In wallet</th>
                  <th>Holding</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>
                      <img
                        src="images/dashboard/ebct.svg"
                        width={25}
                        height={25}
                        alt="ebct"
                      />
                      <h4>EBCT</h4>
                    </span>
                  </td>
                  <td>
                    <div className="column">
                      <h4>
                        {isVisible
                          ? `${user.wallet.assets["EBCT"].wallet}`
                          : "---"}
                      </h4>
                      <h6>
                        {isVisible
                          ? `${"$" + calcAssetWalletValue("EBCT")}`
                          : "--"}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <div className="column">
                      <h4>
                        {isVisible
                          ? `${user.wallet.assets["EBCT"].holding}`
                          : "---"}
                      </h4>
                      <h6>
                        {isVisible
                          ? `${"$" + calcAssetholdingValue("EBCT")}`
                          : "---"}
                      </h6>
                    </div>
                  </td>
                  <td>
                    <div className="buttons">
                      <button onClick={() => handlePopup(1, "EBCT")}>
                        <span>
                          <img
                            src="images/dashboard/stake.svg"
                            alt="stake"
                            height={15}
                            width={15}
                          />
                          Hold
                        </span>
                      </button>
                      <button onClick={() => handlePopup(2, "BTC")}>
                        <span>
                          <img
                            src="images/dashboard/lock.svg"
                            alt="lock"
                            height={15}
                            width={15}
                          />
                          Redeem
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="largebox">
            <h3>Assets</h3>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "start" }}>Asset</th>
                  <th>In wallet</th>
                  <th>Holding</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr>
                    <td>
                      <span>
                        <img
                          src={asset.icon}
                          width={25}
                          height={25}
                          alt={asset.name}
                        />
                        <h4>{asset.name}</h4>
                      </span>
                    </td>
                    <td>
                      <div className="column">
                        <h4>
                          {isVisible
                            ? `${user.wallet.assets[asset.name].wallet}`
                            : "---"}
                        </h4>
                        <h6>
                          {isVisible
                            ? `${"$" + calcAssetWalletValue(asset.name)}`
                            : "---"}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <div className="column">
                        <h4>
                          {isVisible
                            ? `${user.wallet.assets[asset.name].holding}`
                            : "---"}
                        </h4>
                        <h6>
                          {isVisible
                            ? `${"$" + calcAssetholdingValue(asset.name)}`
                            : "---"}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <div className="buttons">
                        <button onClick={() => handlePopup(4, asset.name)}>
                          <span>
                            <img
                              src="images/header/deposit.svg"
                              alt="earn"
                              height={15}
                              width={15}
                            />
                            Deposit
                          </span>
                        </button>
                        <button onClick={() => handlePopup(5, asset.name)}>
                          <span>
                            <img
                              src="images/header/withdraw.svg"
                              alt="redeem"
                              height={15}
                              width={15}
                            />
                            Withdraw
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rightside">
          <div className="recentactivity">
            <h3>Recent Activity</h3>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "start" }}>
                    <div className="thBox" onClick={() => handleSort(1)}>
                      Asset
                      {filter.asset === 1 && <MdKeyboardArrowUp />}
                      {filter.asset === 2 && <MdKeyboardArrowDown />}
                    </div>
                  </th>
                  <th>
                    <div className="thBox" onClick={() => handleSort(2)}>
                      Type
                      {filter.type === 1 && <MdKeyboardArrowUp />}
                      {filter.type === 2 && <MdKeyboardArrowDown />}
                    </div>
                  </th>
                  <th>
                    <div className="thBox" onClick={() => handleSort(3)}>
                      Status
                      {filter.status === 1 && <MdKeyboardArrowUp />}
                      {filter.status === 2 && <MdKeyboardArrowDown />}
                    </div>
                  </th>
                  <th>
                    <div className="thBox" onClick={() => handleSort(4)}>
                      Time
                      {filter.time === 1 && <MdKeyboardArrowUp />}
                      {filter.time === 2 && <MdKeyboardArrowDown />}
                    </div>
                  </th>
                  <th>
                    <div className="thBox" onClick={() => handleSort(5)}>
                      Amount
                      {filter.amount === 1 && <MdKeyboardArrowUp />}
                      {filter.amount === 2 && <MdKeyboardArrowDown />}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="notransactions">
                      No Transactions Yet
                    </td>
                  </tr>
                ) : (
                  <>
                    {transactions
                      .slice(
                        0,
                        transactions.length > 5 ? 5 : transactions.length
                      )
                      .map((transaction) => (
                        <tr>
                          <td>{transaction.asset}</td>
                          <td>{transaction.type}</td>
                          <td>{transaction.status}</td>
                          <td>
                            {transaction.time
                              .toLocaleDateString("en-US")
                              .toString()}
                          </td>
                          <td>{transaction.amount}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
            <div className="viewtransactions">
              <Link to="/transactions">VIEW ALL TRANSACTIONS</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Wallet;
