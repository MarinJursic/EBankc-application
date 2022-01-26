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
            <div className="earnbox"></div>
            <div className="earnbox"></div>
            <div className="earnbox"></div>
          </div>
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
          <div className="carousel"></div>
          <div className="chart"></div>
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

export default Dashboard;
