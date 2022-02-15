/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import DepositWithdrawPopup from "../DepositWithdrawPopup";
import MobileMenu from "../MobileMenu";
import RedeemPopup from "../RedeemPopup";
import EarnPopup from "../EarnPopup";
import BorrowPopup from "../BorrowPopup";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { setVisible } from "../../actions/configActions";
import { useLocation } from "react-router-dom";

function Header({ page }) {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.config.isVisible);
  const prices = useSelector((state) => state.price.prices);
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  const [level, setLevel] = useState(1);

  const [menu, setMenu] = useState(false);

  const levels = [
    { name: "Karma lvl 1", img: "bronze.svg", amount: 0 },
    { name: "Karma lvl 2", img: "silver.svg", amount: 50000 },
    { name: "Karma lvl 3", img: "gold.svg", amount: 200000 },
    { name: "Karma lvl 4", img: "diamond.svg", amount: 1000000 },
  ];

  const getLevel = () => {
    let holding = parseFloat(user.wallet.assets["EBCT"].holding);

    for (let i = 0; i < levels.length; i++) {
      if (i === 3) {
        setLevel(i + 1);
        return;
      } else {
        if (holding >= levels[i].amount && holding < levels[i + 1].amount) {
          setLevel(i + 1);
          return;
        }
      }
    }
  };

  useEffect(() => {
    getLevel();
  }, []);

  const routeInfo = {
    Dashboard: {
      icon: "/images/navigation/dashboard.svg",
      subtitle: "Account value",
      tooltip:
        "This is the aggregate sum of all of your balances on the platform, converted into USD. The sum includes all wallet balances, stake balances and hold balances. It does not include pending balances or balances on hold.",
      btn1: "DEPOSIT",
      btn1Icon: "/images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "/images/header/withdraw.svg",
    },
    Wallet: {
      icon: "/images/navigation/wallet.svg",
      subtitle: "Available",
      tooltip: "The value of your wallet balances, estimated in USD",
      btn1: "DEPOSIT",
      btn1Icon: "/images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "/images/header/withdraw.svg",
    },
    Earn: {
      icon: "/images/navigation/earn.svg",
      subtitle: "Total Holding",
      tooltip:
        "Estimated total value of your staked, holding and holding assets, expressed in USD",
      btn1: "EARN",
      btn1Icon: "/images/dashboard/earn.svg",
      btn2: "REDEEM",
      btn2Icon: "/images/dashboard/redeem.svg",
    },
    Borrow: {
      icon: "/images/navigation/earn.svg",
      subtitle: "Total Borrowing",
      tooltip:
        "Estimated total value of your staked, holding and holding assets, expressed in USD",
      btn1: "BORROW",
      btn1Icon: "/images/dashboard/earn.svg",
      btn2: "REPAY LOAN",
      btn2Icon: "/images/dashboard/redeem.svg",
    },
    EBCT: {
      icon: "/images/ebct.svg",
      subtitle: "Total amount",
      tooltip: "",
      btn1: "DEPOSIT",
      btn1Icon: "/images/header/deposit.svg",
      btn2: "WITHDRAW",
      btn2Icon: "/images/header/withdraw.svg",
    },
    Convert: {
      icon: "/images/navigation/convert.svg",
      subtitle: "Total amount",
      tooltip: "",
      removeBottom: true,
    },
    Buy: {
      icon: "/images/navigation/buy.svg",
      subtitle: "",
      tooltip: "",
      removeBottom: true,
    },
    Transactions: {
      icon: "/images/navigation/transaction.svg",
      subtitle: "Total amount",
      tooltip: "",
      removeBottom: true,
    },
    Settings: {
      icon: "/images/settings/activity.svg",
      subtitle: "Total amount",
      tooltip: "",
      removeBottom: true,
    },
  };

  const calcAssetWalletValue = (asset, turnToString = true) => {
    const val = user.wallet.assets[asset].wallet * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetholdingValue = (asset, turnToString = true) => {
    const val = user.wallet.assets[asset].holding * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetBorrowValue = (asset, turnToString = true) => {
    const val = (user.wallet.assets[asset].borrowed || 0) * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const calcAssetTotalValue = (asset, turnToString = true) => {
    const val =
      calcAssetWalletValue(asset, false) + calcAssetholdingValue(asset, false);

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const getAccValue = () => {
    let sum = 0;

    if (page === "EBCT") {
      sum = calcAssetTotalValue("EBCT", false);
      return (Math.round(sum * 100) / 100).toLocaleString("en-US");
    }

    for (const [asset, _] of Object.entries(user.wallet.assets)) {
      let val = 0;

      switch (page) {
        case "Wallet":
          val = calcAssetWalletValue(asset, false);
          break;
        case "Earn":
          val = calcAssetholdingValue(asset, false);
          break;
        case "Borrow":
          val = calcAssetBorrowValue(asset, false);
          break;
        default:
          val = calcAssetTotalValue(asset, false);
          break;
      }

      sum += val;
    }

    return (Math.round(sum * 100) / 100).toLocaleString("en-US");
  };

  const [dropdown, setDropdown] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(0);

  const handleVisible = () => {
    dispatch(setVisible(!isVisible));
  };

  const handleButton = (type) => {
    switch (type) {
      case "DEPOSIT":
        setButtonPopup(1);
        break;
      case "WITHDRAW":
        setButtonPopup(2);
        break;
      case "EARN":
        setButtonPopup(3);
        break;
      case "REDEEM":
        setButtonPopup(4);
        break;
      case "BORROW":
        setButtonPopup(5);
        break;
      default:
        break;
    }
  };

  const getButtonPopup = () => {
    switch (buttonPopup) {
      case 1:
        return (
          <DepositWithdrawPopup
            popup={buttonPopup}
            setPopup={setButtonPopup}
            type={"deposit"}
          />
        );
      case 2:
        return (
          <DepositWithdrawPopup
            popup={buttonPopup}
            setPopup={setButtonPopup}
            type={"withdraw"}
          />
        );
      case 3:
        return (
          <EarnPopup
            popup={buttonPopup}
            setPopup={setButtonPopup}
            asset="USDT"
          />
        );
      case 4:
        return <RedeemPopup popup={buttonPopup} setPopup={setButtonPopup} />;
      case 5:
        return <BorrowPopup popup={buttonPopup} setPopup={setButtonPopup} />;
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
      <div
        className={
          location.pathname !== "/buy" &&
          location.pathname !== "/convert" &&
          location.pathname !== "/transactions" &&
          location.pathname !== "/settings"
            ? "mRow"
            : "mRow without"
        }
      >
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
            src={`/images/karma/${levels[level - 1].img}`}
            alt="level"
            width={25}
            height={25}
            className="mOutside level"
          />
          <div className="rmobile">
            <img
              src={menu ? "/images/close.svg" : "/images/header/menu.svg"}
              alt="menu"
              width={menu ? 20 : 25}
              height={menu ? 20 : 25}
              className="menubtn"
              onClick={handleMenu}
            />
          </div>
          <div className="rtwo">
            <img
              src="/images/header/notification.svg"
              alt="level"
              width={25}
              height={25}
              className="mOutside mBell"
            />
            <div className="notificationdropdown">
              <h3>Notifications - 0 New</h3>
              {user.notifications.map((each) => (
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
                <h4>{levels[level - 1].name} Tier</h4>
              </div>
              {!dropdown ? (
                <img
                  src="/images/header/down.svg"
                  alt="down"
                  width={20}
                  height={20}
                  className="dropicon"
                />
              ) : (
                <img
                  src="/images/header/up.svg"
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
                          src="/images/header/settings.svg"
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
                          src="/images/header/support.svg"
                          alt="support"
                          width={20}
                          height={20}
                        />
                        <h3>Support</h3>
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" onClick={() => dispatch(logout())}>
                        <img
                          src="/images/header/logout.svg"
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
      {routeInfo[page] && !routeInfo[page].removeBottom && (
        <div className="mRow">
          <span className="mLeft">
            <span>
              {routeInfo[page].subtitle}
              <img
                onClick={handleVisible}
                src={
                  isVisible
                    ? "/images/header/crossed.svg"
                    : "/images/header/eye.svg"
                }
                alt="eye"
                width={20}
                height={20}
                className="mEye"
              />
            </span>
            <span>
              <h1>{isVisible ? `${"$" + getAccValue() || "0.00"}` : "---"}</h1>
              {routeInfo[page].tooltip !== "" && (
                <>
                  <img
                    src="/images/header/info.svg"
                    alt="eye"
                    width={20}
                    height={20}
                    className="mInfo"
                  />
                  <p className="mTooltip">{routeInfo[page].tooltip}</p>
                </>
              )}
            </span>
          </span>
          <div className="mRight">
            {routeInfo[page].btn1 && (
              <button onClick={() => handleButton(routeInfo[page].btn1)}>
                <img
                  src={routeInfo[page].btn1Icon}
                  alt="btnIcon"
                  width={20}
                  height={20}
                />
                <h3>{routeInfo[page].btn1}</h3>
              </button>
            )}
            {routeInfo[page].btn2 && (
              <button onClick={() => handleButton(routeInfo[page].btn2)}>
                <img
                  src={routeInfo[page].btn2Icon}
                  alt="btnIcon"
                  width={20}
                  height={20}
                />
                <h3>{routeInfo[page].btn2}</h3>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
