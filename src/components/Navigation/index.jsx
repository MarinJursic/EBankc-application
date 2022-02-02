import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles.scss";

function Navigation() {
  const location = useLocation().pathname;

  return (
    <aside className="sidemenu">
      <a href="https://google.com" className="logo">
        <img
          src="images/navigation/logo.svg"
          alt="logo"
          height={80}
          width={175}
        />
      </a>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <span
                className={
                  location === "/dashboard" ? "spanbox active" : "spanbox"
                }
              >
                <img
                  src="images/navigation/dashboard.svg"
                  alt="dashboard"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Dashboard</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/wallet">
              <span
                className={
                  location === "/wallet" ? "spanbox active" : "spanbox"
                }
              >
                <img
                  src="images/navigation/wallet.svg"
                  alt="wallet"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Wallet</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/earn">
              <span
                className={location === "/earn" ? "spanbox active" : "spanbox"}
              >
                <img
                  src="images/navigation/earn.svg"
                  alt="earn"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Earn</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/ebct">
              <span
                className={location === "/ebct" ? "spanbox active" : "spanbox"}
              >
                <img
                  src="images/navigation/ebnk.svg"
                  alt="ebnk"
                  width={20}
                  height={20}
                  className="routeIcon filterclass"
                />
                <span className="textspan">Ebnk</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/convert">
              <span
                className={
                  location === "/convert" ? "spanbox active" : "spanbox"
                }
              >
                <img
                  src="images/navigation/convert.svg"
                  alt="convert"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Convert</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/buy">
              <span
                className={location === "/buy" ? "spanbox active" : "spanbox"}
              >
                <img
                  src="images/navigation/buy.svg"
                  alt="buy"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Buy Crypto</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/transactions">
              <span
                className={
                  location === "/transactions" ? "spanbox active" : "spanbox"
                }
              >
                <img
                  src="images/navigation/transaction.svg"
                  alt="transaction"
                  width={20}
                  height={20}
                  className="routeIcon"
                />
                <span className="textspan">Transactions</span>
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navigation;
