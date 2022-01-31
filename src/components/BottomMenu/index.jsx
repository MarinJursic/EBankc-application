import React, { useState } from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function BottomMenu() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      {open ? (
        <footer className="menu">
          <div className="content">
            <ul>
              <li>Deposit</li>
              <li>Withdraw</li>
              <li>Earn</li>
              <li>Redeem</li>
              <li>Convert</li>
              <li>Stake</li>
              <li>Lock</li>
            </ul>
            <div className="btnbox">
              <button onClick={handleOpen}>
                <MdKeyboardArrowDown size={30} color="white" />
              </button>
            </div>
          </div>
        </footer>
      ) : (
        <footer className="footerMenu">
          <div className="content">
            <ul>
              <li>
                <Link to="/dashboard" className="active">
                  <img
                    src="images/navigation/dashboard.svg"
                    alt="dashboard"
                    width={20}
                    height={20}
                  />
                  <h5>Dashboard</h5>
                </Link>
              </li>
              <li>
                <Link to="/wallet">
                  <img
                    src="images/navigation/wallet.svg"
                    alt="wallet"
                    width={20}
                    height={20}
                  />
                  <h5>Wallet</h5>
                </Link>
              </li>
              <li>
                <button onClick={handleOpen}>
                  <MdKeyboardArrowUp size={30} color="white" />
                </button>
              </li>
              <li>
                <Link to="/earn">
                  <img
                    src="images/navigation/earn.svg"
                    alt="earn"
                    width={20}
                    height={20}
                  />
                  <h5>Earn</h5>
                </Link>
              </li>
              <li>
                <Link to="/ebct">
                  <img
                    src="images/navigation/ebnk.svg"
                    alt="ebct"
                    width={20}
                    height={20}
                  />
                  <h5>EBCT</h5>
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

export default BottomMenu;
