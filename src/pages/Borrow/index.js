import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

function Borrow() {
  const isVisible = useSelector((state) => state.config.isVisible);
  const prices = useSelector((state) => state.price.prices);
  const user = useSelector((state) => state.auth.user);

  const info = [
    {
      name: "USDC",
      icon: "images/dashboard/usdc.svg",
      prcnt: "2%",
      lockup: true,
    },
    {
      name: "USDT",
      icon: "images/dashboard/usdt.svg",
      prcnt: "2%",
      lockup: true,
    },
  ];

  const calcAssetholdingValue = (asset, turnToString = true) => {
    const val = user.wallet.assets[asset].borrowed * prices[asset];

    return turnToString ? val.toLocaleString("en-US") : val;
  };

  const truncate = (amount) => {
    let truncated = Math.trunc(amount);

    console.log(
      amount,
      truncated,
      parseFloat(amount - truncated),
      parseFloat(1.00001 - 1)
    );

    if (parseFloat(amount - truncated) >= parseFloat(0.000001)) {
      return amount.toFixed(5);
    } else {
      return Math.round(amount);
    }
  };

  return (
    <main className="borrow">
      <Header page="Borrow" />
      <section className="tokenBoxesRow">
        {info.map((coin, index) => (
          <Link to={`${coin.name}`} className="tokenbox">
            <div className="header">
              <img src={coin.icon} alt={coin.name} height={35} width={35} />
              <h3>{coin.name}</h3>
            </div>
            <div className="middle">
              <div className="midleft">
                <h4 style={{ opacity: "0.5" }}>Borrowed</h4>
                <h2>
                  {isVisible
                    ? `${truncate(user.wallet.assets[coin.name].borrowed)}`
                    : "----"}
                </h2>
                <h3 style={{ opacity: "0.5" }}>
                  {isVisible
                    ? `${"$" + calcAssetholdingValue(coin.name)}`
                    : "---"}
                </h3>
              </div>
              <div className="midright">
                <h4>Rate as</h4>
                <h2 className="green">{coin.prcnt}</h2>
              </div>
            </div>
            <div className="bottom">
              <div className="botleft">
                <h5 style={{ opacity: "0.5" }}>
                  Loan repayment period (312 days)
                </h5>
                <h6 style={{ opacity: "0.5" }}>Instant credit</h6>
              </div>
              <div className="botright">
                <button>View Details</button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Borrow;
