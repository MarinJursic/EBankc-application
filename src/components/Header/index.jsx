import React, { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import DepositPopup from "../DepositPopup";
import MobileMenu from "../MobileMenu";

function Header({ page }) {
  const [menu, setMenu] = useState(false);

  const routeInfo = {
    Dashboard: {
      icon: "images/navigation/dashboard.svg",
      subtitle: "Account value",
      tooltip:
        "This is the aggregate sum of all of your balances on the platform, converted into USD. The sum includes all wallet balances, stake balances and lock balances. It does not include pending balances or balances on hold.",
      btn1: "DEPOSIT",
      btn1Icon: "images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "images/header/withdraw.svg",
    },
    Wallet: {
      icon: "images/navigation/wallet.svg",
      subtitle: "Available",
      tooltip: "The value of your wallet balances, estimated in USD",
      btn1: "DEPOSIT",
      btn1Icon: "images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "images/header/withdraw.svg",
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
      btn1Icon: "images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "images/header/withdraw.svg",
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

  const handleMenu = () => {
    setMenu((menu) => !menu);
  };

  return (
    <header className="mainheader">
      {menu && <MobileMenu />}
      {buttonPopup !== 0 && getButtonPopup()}
      <div className="mRow">
        <span className="mTitle">
          <img
            src={routeInfo[page].icon}
            alt="routeIcon"
            width={30}
            height={30}
          />
          <h1>{page}</h1>
        </span>
        <span className="mInfo">
          <img
            src="images/header/bronze.svg"
            alt="level"
            width={25}
            height={25}
            className="mOutside"
          />
          <div className="rmobile">
            <img
              src={menu ? "images/close.svg" : "images/header/menu.svg"}
              alt="menu"
              width={menu ? 20 : 25}
              height={menu ? 20 : 25}
              className="menubtn"
              onClick={handleMenu}
            />
          </div>
          <div className="rtwo">
            <img
              src="images/header/notification.svg"
              alt="level"
              width={25}
              height={25}
              className="mOutside mBell"
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
              className="mMenu"
              onClick={() => setDropdown((dropdown) => !dropdown)}
            >
              <div className="mColumn">
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
                <div className="mDropdown">
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
          </div>
        </span>
      </div>
      {routeInfo[page] && (
        <div className="mRow">
          <span className="mLeft">
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
                className="mEye"
              />
            </span>
            <span>
              <h1>{visible ? "$0.00" : "---"}</h1>
              <img
                src="images/header/info.svg"
                alt="eye"
                width={20}
                height={20}
                className="mInfo"
              />
              <p className="mTooltip">{routeInfo[page].tooltip}</p>
            </span>
          </span>
          <div className="mRight">
            <button onClick={() => handleButton(routeInfo[page].btn1)}>
              <img
                src={routeInfo[page].btn1Icon}
                alt="btnIcon"
                width={20}
                height={20}
              />
              <h3>{routeInfo[page].btn1}</h3>
            </button>
            <button onClick={() => handleButton(routeInfo[page].btn2)}>
              <img
                src={routeInfo[page].btn2Icon}
                alt="btnIcon"
                width={20}
                height={20}
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
