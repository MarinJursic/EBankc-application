import React from "react";
import "./styles.scss";

import Header from "../../components/Header";

function Dashboard() {
  return (
    <main className="dashboard">
      <Header page="Dashboard" />
      <section>
        <div className="leftside">
          <div className="earnings">
            <div className="earnbox">
              <h6>24h earnings</h6>
              <h4>---</h4>
            </div>
            <div className="earnbox">
              <h6>7d earnings</h6>
              <h4>---</h4>
            </div>
            <div className="earnbox">
              <h6>30d earnings</h6>
              <h4>---</h4>
            </div>
          </div>
          <div className="largebox">
            <h3>EBCT</h3>
            <table></table>
          </div>
          <div className="largebox">
            <h3>Assets</h3>
            <table></table>
          </div>
        </div>
        <div className="rightside">
          <div className="carousel"></div>
          <div className="chart"></div>
          <div className="recentactivity">
            <h3>Recent Activity</h3>
            <table></table>
            <button className="viewtransactions">VIEW ALL TRANSACTIONS</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
