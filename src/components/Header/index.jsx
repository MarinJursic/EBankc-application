import React, { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import DepositPopup from "../DepositPopup";

function Header({ page }) {
  const routeInfo = {
    Dashboard: {
      icon: "images/navigation/dashboard.svg",
      subtitle: "Account value",
      tooltip:
        "This is the aggregate sum of all of your balances on the platform, converted into USD. The sum includes all wallet balances, stake balances and lock balances. It does not include pending balances or balances on hold.",
      btn1: "DEPOSIT",
      btn2: "WITHDRAW",
    },
    Wallet: {
      icon: "images/navigation/wallet.svg",
      subtitle: "Available",
      tooltip: "The value of your wallet balances, estimated in USD",
      btn1: "DEPOSIT",
      btn2: "WITHDRAW",
    },
    Earn: {
      icon: "images/navigation/earn.svg",
      subtitle: "Total deployed",
      tooltip:
        "Estimated total value of your staked, locked and deployed assets, expressed in USD",
      btn1: "EARN",
      btn2: "REDEEM",
    },
    EBCT: {
      icon: "images/navigation/EBCT.svg",
      subtitle: "Total amount",
      tooltip: "",
      btn1: "DEPOSIT",
      btn2: "WITHDRAW",
    },
  };

  const notifications = [
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
    {
      action: "Logout",
      time: "2 days ago",
    },
  ];

  const [dropdown, setDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(0);

  const handleVisible = () => {
    setVisible((visible) => !visible);
  };

  const handleButton = (type) => {
    switch (type) {
      case "DEPOSIT":
        setButtonPopup(1);
        break;
      case "WITHDRAW":
        setButtonPopup(1);
        break;
      case "EARN":
        setButtonPopup(3);
        break;
      case "REDEEM":
        setButtonPopup(4);
        break;
      default:
        break;
    }
  };

  const getButtonPopup = () => {
    switch (buttonPopup) {
      case 1:
        return <DepositPopup popup={buttonPopup} setPopup={setButtonPopup} />;
      case 2:
        return <DepositPopup popup={buttonPopup} setPopup={setButtonPopup} />;
      case 3:
        return <div>Hi there</div>;
      case 4:
        return <div>Wassup</div>;
      default:
        break;
    }
  };

  return (
    <header className="mainheader">
      {buttonPopup !== 0 && getButtonPopup()}
      <div className="row">
        <span className="title">
          <img
            src={routeInfo[page].icon}
            alt="routeIcon"
            width={30}
            height={30}
          />
          <h1>{page}</h1>
        </span>
        <span className="info">
          <img
            src="images/header/notification.svg"
            alt="level"
            width={25}
            height={25}
            className="outside"
          />
          <img
            src="images/header/notification.svg"
            alt="level"
            width={25}
            height={25}
            className="outside bell"
          />
          <div className="notificationdropdown">
            <h3>Notifications - 0 New</h3>
            {notifications.map((each) => (
              <span>
                <h4>{each.action}</h4>
                <h6>{each.time}</h6>
              </span>
            ))}
          </div>
          <div
            className="menu"
            onClick={() => setDropdown((dropdown) => !dropdown)}
          >
            <div className="column">
              <h3>EBankc App User</h3>
              <h4>Bronze Tier</h4>
            </div>
            {dropdown ? (
              <img
                src="images/header/down.svg"
                alt="down"
                width={20}
                height={20}
                className="dropicon"
              />
            ) : (
              <img
                src="images/header/up.svg"
                alt="up"
                height={20}
                width={20}
                className="dropicon"
              />
            )}
            {dropdown && (
              <div className="dropdown">
                <ul>
                  <li>
                    <Link to="/settings">
                      <img
                        src="images/header/settings.svg"
                        alt="settings"
                        width={20}
                        height={20}
                      />
                      <h3>Settings</h3>
                    </Link>
                  </li>
                  <li>
                    <Link to="/support">
                      <img
                        src="images/header/support.svg"
                        alt="support"
                        width={20}
                        height={20}
                      />
                      <h3>Support</h3>
                    </Link>
                  </li>
                  <li>
                    <Link to="/logout">
                      <img
                        src="images/header/logout.svg"
                        alt="logout"
                        width={20}
                        height={20}
                      />
                      <h3>Logout</h3>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </span>
      </div>
      {routeInfo[page] && (
        <div className="row">
          <span className="left">
            <span>
              {routeInfo[page].subtitle}
              <img
                onClick={handleVisible}
                src={
                  visible
                    ? "images/header/crossed.svg"
                    : "images/header/eye.svg"
                }
                alt="eye"
                width={20}
                height={20}
                className="eye"
              />
            </span>
            <span>
              <h1>{visible ? "$0.00" : "---"}</h1>
              <img
                src="images/header/info.svg"
                alt="eye"
                width={20}
                height={20}
                className="info"
              />
              <p className="tooltip">{routeInfo[page].tooltip}</p>
            </span>
          </span>
          <div className="right">
            <button onClick={() => handleButton(routeInfo[page].btn1)}>
              <img
                src="images/navigation/dashboard.svg"
                alt="btnIcon"
                width={25}
                height={25}
              />
              <h3>{routeInfo[page].btn1}</h3>
            </button>
            <button onClick={() => handleButton(routeInfo[page].btn2)}>
              <img
                src="images/navigation/dashboard.svg"
                alt="btnIcon"
                width={25}
                height={25}
              />
              <h3>{routeInfo[page].btn2}</h3>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
