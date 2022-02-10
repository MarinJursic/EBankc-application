import React from "react";
import "./styles.scss";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

export default function BuyCrypto() {
  return (
    <main className="buyCrypto">
      <Header page="Buy" />
      <section className="desktop">
        <Link to="/settings?openQuery=1" className="kyc">
          <h3>Start KYC Level 2</h3>
          <div className="mainkyc">
            <p>KYC Level 2 is required to purchase cryptocurrency with fiat</p>
            <Link to="/settings?openQuery=1">START KYC LEVEL 2</Link>
          </div>
        </Link>
      </section>
    </main>
  );
}
