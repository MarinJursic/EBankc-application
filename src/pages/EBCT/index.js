import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./styles.scss";
import Chart from "../../components/Chart";
import HoldPopup from "../../components/HoldPopup";
import RedeemPopup from "../../components/RedeemPopup";
import EarnPopup from "../../components/EarnPopup";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

function EBCT() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.config.isVisible);
  const user = useSelector((state) => state.auth.user);
  const prices = useSelector((state) => state.price.prices);

  const [time, setTime] = useState("7 days");
  const [asset, setAsset] = useState();
  const [popup, setPopup] = useState(0);

  const levels = [
    { name: "Bronze", img: "bronze.svg" },
    { name: "Silver", img: "silver.svg" },
    { name: "Gold", img: "gold.svg" },
    { name: "Diamond", img: "diamond.svg" },
  ];

  const handleChange = (event) => {
    setTime(event.target.value);
  };

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
        return <div>Wassup</div>;
      default:
        break;
    }
  };

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

  const calcAssetWalletValue = (asset, turnToString = true) => {
    const val = user.wallet.assets[asset].wallet * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetholdingValue = (asset, turnToString = true) => {
    const val = user.wallet.assets[asset].holding * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetTotalValue = (asset, turnToString = true) => {
    const val =
      calcAssetWalletValue(asset, false) + calcAssetholdingValue(asset, false);

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  return (
    <main className="EBCT">
      <Header page="EBCT" />
      {popup !== 0 && getPopup()}
      <section className="desktop">
        <div className="fullwidth">
          <div className="earningsAndChart">
            <div className="earnings">
              <div className="earnbox">
                <h6>24h earnings</h6>
                <h4>
                  {isVisible ? "$" + user.wallet.earnings.dailyEarnings : "---"}
                </h4>
              </div>
              <div className="earnbox">
                <h6>7d earnings</h6>
                <h4>
                  {isVisible
                    ? "$" + user.wallet.earnings.weeklyEarnings
                    : "---"}
                </h4>
              </div>
              <div className="earnbox">
                <h6>30d earnings</h6>
                <h4>
                  {isVisible
                    ? "$" + user.wallet.earnings.monthlyEarnings
                    : "---"}
                </h4>
              </div>
            </div>
            <div className="chart">
              <span>
                <div className="top">
                  <img
                    src="images/dashboard/ebct.svg"
                    alt="ebct"
                    width={30}
                    height={30}
                  />
                  <h4>EBCT</h4>
                </div>
                <div className="bottom">
                  <h3>{isVisible ? `$${prices["EBCT"]}` : "---"}</h3>
                  <select name="time" id="time" onChange={handleChange}>
                    <option value="7 days">7 days</option>
                    <option value="14 days">14 days</option>
                    <option value="30 days">30 days</option>
                  </select>
                </div>
              </span>
              <Chart time={time} />
            </div>
          </div>
          <div className="ebct">
            <button className="title">
              <div className="leftmaintitle">
                <img
                  src="images/dashboard/ebct.svg"
                  alt="ebct"
                  width={30}
                  height={30}
                  className="titleimg"
                />
                <h2>EBCT</h2>
              </div>
            </button>
            <div className="content height">
              <div className="title">
                <div className="lefttitle">
                  <img
                    src="images/dashboard/stake.svg"
                    alt="ebct"
                    width={20}
                    height={20}
                    className="titleimg"
                  />
                  <h4>Holding</h4>
                </div>
                <div className="righttitle">
                  <div className="text">
                    <h1>
                      {isVisible
                        ? `${user.wallet.assets["EBCT"].holding}`
                        : "---"}
                    </h1>
                    <h2>
                      {isVisible
                        ? `${"$" + calcAssetholdingValue("EBCT")}`
                        : "---"}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="title">
                <div className="lefttitle">
                  <img
                    src="images/navigation/wallet.svg"
                    alt="ebct"
                    width={20}
                    height={20}
                    className="titleimg"
                  />
                  <h4>In Wallet</h4>
                </div>
                <div className="righttitle">
                  <div className="text">
                    <h1>
                      {isVisible
                        ? `${user.wallet.assets["EBCT"].wallet}`
                        : "---"}
                    </h1>
                    <h2>
                      {isVisible
                        ? `${"$" + calcAssetWalletValue("EBCT")}`
                        : "---"}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="buttonBox">
                <div>
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
                <Link to="/convert">
                  <span>
                    <img
                      src="images/navigation/convert.svg"
                      alt="lock"
                      height={15}
                      width={15}
                    />
                    Convert
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="largebox">
            <h3>EBCT</h3>
            <table>
              <thead>
                <tr>
                  <th style={{ textAlign: "start" }}>Asset</th>
                  <th>Holding</th>
                  <th>In wallet</th>
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
                        {" "}
                        {isVisible
                          ? `${user.wallet.assets["EBCT"].holding}`
                          : "---"}
                      </h4>
                      <h6>
                        {" "}
                        {isVisible
                          ? `${"$" + calcAssetholdingValue("EBCT")}`
                          : "---"}
                      </h6>
                    </div>
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
                      <Link to="/convert">
                        <span>
                          <img
                            src="images/navigation/convert.svg"
                            alt="lock"
                            height={15}
                            width={15}
                          />
                          Convert
                        </span>
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="below">
          <div className="leftside">
            <div className="earnings">
              <div className="earnbox">
                <span>
                  <img
                    src={`/images/karma/${levels[user.level - 1].img}`}
                    alt="bronze"
                    width={25}
                    height={25}
                  />
                  <strong>{levels[user.level - 1].name}</strong>
                  tier
                </span>
                <div className="linegraph">
                  <h5>{isVisible ? "0" : "---"}</h5>
                  <div className="containergraph">
                    <div className="reached"></div>
                  </div>
                  <h5 className="destination">5,000 EBCT</h5>
                </div>
                <p>
                  Stake or lock {isVisible ? "5,000" : "-"} more EBCT to react
                  Level {user.level + 1}.
                </p>
              </div>
            </div>
            <div className="largebox">
              <h3>EBCT Token Returns</h3>
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "start" }}>
                      Karma lvl / EBCT Staked.
                    </th>
                    <th>Return</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span>
                        <img
                          src="/images/karma/bronze.svg"
                          width={25}
                          height={25}
                          alt="ebct"
                        />
                        <div className="karmaContent">
                          <h4>Karma lvl 1.</h4>
                          <h4>0 - 4,999</h4>
                        </div>
                      </span>
                    </td>
                    <td>2%</td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <img
                          src="/images/karma/silver.svg"
                          width={25}
                          height={25}
                          alt="ebct"
                        />
                        <div className="karmaContent">
                          <h4>Karma lvl 2.</h4>
                          <h4>5,000 - 19,999</h4>
                        </div>
                      </span>
                    </td>
                    <td>4%</td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <img
                          src="/images/karma/gold.svg"
                          width={25}
                          height={25}
                          alt="ebct"
                        />
                        <div className="karmaContent">
                          <h4>Karma lvl 3.</h4>
                          <h4>20,000 - 100,000</h4>
                        </div>
                      </span>
                    </td>
                    <td>6%</td>
                  </tr>
                  <tr>
                    <td>
                      <span>
                        <img
                          src="/images/karma/diamond.svg"
                          width={25}
                          height={25}
                          alt="ebct"
                        />

                        <div className="karmaContent">
                          <h4>Karma lvl 4.</h4>
                          <h4>Above 100,000</h4>
                        </div>
                      </span>
                    </td>
                    <td>8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rightside">
            <div className="earnings">
              <div className="earnbox">
                <div className="earntext">
                  <h5>Auto-Stake EBCT deposits</h5>
                  <img
                    src="/images/header/info.svg"
                    alt="info"
                    width={15}
                    height={15}
                  />
                </div>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
              </div>
              <div className="earnbox">
                <div className="earntext">
                  <h5>Auto-Compound</h5>
                  <img
                    src="/images/header/info.svg"
                    alt="info"
                    width={15}
                    height={15}
                  />
                </div>
                <AntSwitch inputProps={{ "aria-label": "ant design" }} />
              </div>
            </div>
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
        </div>
      </section>
    </main>
  );
}

export default EBCT;