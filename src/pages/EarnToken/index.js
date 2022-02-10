import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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

function EarnToken() {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.config.isVisible);
  const { token } = useParams();

  const tokenName = token.toUpperCase();

  const assets = {
    BTC: {
      name: "BTC",
      icon: "/images/dashboard/bitcoin.svg",
      description:
        "The EBankc BTC portfolio offers the best short term interest rate of up to 8% in 30 days. It lets you enjoy market volatility while earning passively on the crypto.",
      lvl1: 2,
      lvl1range: "0 - 4,999",
      lvl2: 4,
      lvl2range: "5,000 - 19,999",
      lvl3: 6,
      lvl3range: "20,000 - 100,000",
      lvl4: 8,
      lvl4range: "Above 100,000",
      autoDeploy: false,
    },
    ETH: {
      name: "ETH",
      icon: "/images/dashboard/ethereum.svg",
      description:
        "The EBankc ETH portfolio offers the best short term interest rate of up to 8% in 30 days. It lets you enjoy market volatility while earning passively on the crypto.",
      lvl1: 2,
      lvl1range: "0 - 4,999",
      lvl2: 4,
      lvl2range: "5,000 - 19,999",
      lvl3: 6,
      lvl3range: "20,000 - 100,000",
      lvl4: 8,
      lvl4range: "Above 100,000",
      autoDeploy: true,
    },
    BNB: {
      name: "BNB",
      icon: "/images/dashboard/bnb.svg",
      description:
        "The EBankc BNB portfolio offers the best short term interest rate of up to 6% in 30 days. It lets you enjoy market volatility while earning passively on the crypto.",
      lvl1: 2,
      lvl1range: "0 - 4,999",
      lvl2: 4,
      lvl2range: "5,000 - 19,999",
      lvl3: 6,
      lvl3range: "20,000 - 100,000",
      lvl4: 8,
      lvl4range: "Above 100,000",
      autoDeploy: true,
    },
    USDC: {
      name: "USDC",
      icon: "/images/dashboard/usdc.svg",
      description:
        "The EBankc USDC portfolio offers the best short term interest rate of up to 9% in 30 days. It's perfect for users that want to avoid market volatility while earning passively on the crypto.",
      lvl1: 1,
      lvl1range: "0 - 4,999",
      lvl2: 2,
      lvl2range: "5,000 - 19,999",
      lvl3: 4,
      lvl3range: "20,000 - 100,000",
      lvl4: 6,
      lvl4range: "Above 100,000",
      autoDeploy: true,
    },
    USDT: {
      name: "USDT",
      icon: "/images/dashboard/usdt.svg",
      description:
        "The EBankc USDT portfolio offers the best short term interest rate of up to 9% in 30 days. Ifs perfect for users that want to avoid market volatility while earning passively on the crypto.",
      lvl1: 3,
      lvl1range: "0 - 4,999",
      lvl2: 5,
      lvl2range: "5,000 - 19,999",
      lvl3: 7,
      lvl3range: "20,000 - 100,000",
      lvl4: 9,
      lvl4range: "Above 100,000",
      autoDeploy: false,
    },
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

  return (
    <main className="earntoken">
      <Header page="Earn" />
      <section className="desktop">
        <div className="leftside">
          <div className="largebox">
            <h3>About {assets[tokenName].name}</h3>
            <p>{assets[tokenName].description}</p>
          </div>
          <div className="earnings">
            <div className="earnbox">
              <img src="/images/lock.svg" alt="lock" width={25} height={25} />
              <h4>30 days locked up period</h4>
            </div>
            <div className="earnbox">
              <img src="/images/time.svg" alt="time" width={25} height={25} />
              <h4>Rewards paid daily</h4>
            </div>
          </div>
          <div className="largebox">
            <h3>EBankc {assets[tokenName].name} Returns</h3>
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
                        <h4>{assets[tokenName].lvl1range}</h4>
                      </div>
                    </span>
                  </td>
                  <td>{assets[tokenName].lvl1}%</td>
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
                        <h4>{assets[tokenName].lvl2range}</h4>
                      </div>
                    </span>
                  </td>
                  <td>{assets[tokenName].lvl2}%</td>
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
                        <h4>{assets[tokenName].lvl3range}</h4>
                      </div>
                    </span>
                  </td>
                  <td>{assets[tokenName].lvl3}%</td>
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
                        <h4>{assets[tokenName].lvl4range}</h4>
                      </div>
                    </span>
                  </td>
                  <td>{assets[tokenName].lvl4}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="rightside">
          <div className="largebox">
            <h3>Your Holdings</h3>
            <table>
              <thead>
                <tr>
                  <th>Holding</th>
                  <th>{assets[tokenName].name} Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="column">
                      <h4>{isVisible ? "0.00" : "---"}</h4>
                      <h6>{isVisible ? "$0.00" : "---"}</h6>
                    </div>
                  </td>
                  <td>
                    <div className="column">
                      <h4>{isVisible ? "0.00" : "---"}</h4>
                      <h6>{isVisible ? "$0.00" : "---"}</h6>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="earnings">
            <div className="earnbox">
              <div className="earntext">
                <h4>Auto-Compound</h4>
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
              <h4 className="nextreward">
                Next reward due in <strong>22 days</strong>
              </h4>
            </div>
            {assets[tokenName].autoDeploy && (
              <div className="earnbox">
                <div className="earntext">
                  <h4>Auto-Deploy deposits</h4>
                  <img
                    src="/images/header/info.svg"
                    alt="info"
                    width={15}
                    height={15}
                  />
                </div>
                <AntSwitch inputProps={{ "aria-label": "ant design" }} />
              </div>
            )}
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
      </section>
    </main>
  );
}

export default EarnToken;
