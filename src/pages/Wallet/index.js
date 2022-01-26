import React from "react";
import Header from "../../components/Header";

function index() {
  return (
    <main className="wallet">
      <Header page="Wallet" />
      <section>
        <div className="leftside">
          <div className="EBCT">
            <h2>EBCT</h2>
            <table></table>
          </div>
          <div className="assets">
            <h2>Assets</h2>
            <table></table>
          </div>
        </div>
        <div className="rightside">
          <div className="recentactivity">
            <h2>Recent Activity</h2>
            <table></table>
            <div className="viewtransactions"></div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default index;
