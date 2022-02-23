import React from "react";
import { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";

function MobileMenu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [active, setActive] = useState(1);

  return (
    <div className="mobileMenu">
      <header>
        <h3
          style={active === 1 ? { borderBottom: "1px solid white" } : null}
          onClick={() => setActive((active) => 1)}
        >
          MENU
        </h3>
        <h3
          style={active === 2 ? { borderBottom: "1px solid white" } : null}
          onClick={() => setActive((active) => 2)}
        >
          NOTIFICATIONS
        </h3>
      </header>
      {active === 1 ? (
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">
                <span>
                  <img
                    src="/images/navigation/dashboard.svg"
                    alt="dashboard"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Dashboard</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/wallet">
                <span>
                  <img
                    src="/images/navigation/wallet.svg"
                    alt="wallet"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Wallet</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/earn">
                <span>
                  <img
                    src="/images/navigation/earn.svg"
                    alt="earn"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Earn</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/borrow">
                <span>
                  <img
                    src="/images/borrow.svg"
                    alt="earn"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Borrow</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/ebct">
                <span>
                  <img
                    src="/images/navigation/ebnk.svg"
                    alt="ebnk"
                    width={25}
                    height={25}
                    className="routeIcon"
                    style={{ filter: "none" }}
                  />
                  <span className="textspan">EBCT</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/convert">
                <span>
                  <img
                    src="/images/navigation/convert.svg"
                    alt="convert"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Convert</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/buy">
                <span>
                  <img
                    src="/images/navigation/buy.svg"
                    alt="buy"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Buy Crypto</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/transactions">
                <span>
                  <img
                    src="/images/navigation/transaction.svg"
                    alt="transaction"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Transactions</span>
                </span>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <span>
                  <img
                    src="/images/header/settings.svg"
                    alt="settings"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Settings</span>
                </span>
              </Link>
            </li>
            <li>
              <a
                href="https://ebankc.netlify.app/faq"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <img
                    src="/images/header/support.svg"
                    alt="support"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Support</span>
                </span>
              </a>
            </li>
            <li>
              <button onClick={() => dispatch(logout())}>
                <span>
                  <img
                    src="/images/header/logout.svg"
                    alt="logout"
                    width={25}
                    height={25}
                    className="routeIcon"
                  />
                  <span className="textspan">Logout</span>
                </span>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <div className="notif">
          {user.notifications.map((n, index) => (
            <div className="notificationObject">
              <h2>{n.action}</h2>
              <h3>{n.time}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
