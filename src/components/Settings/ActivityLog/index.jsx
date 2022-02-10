import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

function RecentActivity({ data, labels, title, flipVertical = false }) {
  return (
    <div
      className={`recentactivity ${flipVertical ? "flipVertical" : undefined}`}
    >
      <div className="top">
        <p>{title}</p>
      </div>
      <table>
        <thead>
          <tr>
            {labels.map((label, i) => (
              <th style={i === 0 ? { textAlign: "start" } : undefined}>
                <div className="thBox">{label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((obj, i) => (
            <tr key={i}>
              {Object.values(obj).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flipTable">
        {labels.map((label, i) => (
          <div className="row">
            <p className="label">{label}</p>
            <p className="value">{Object.values(data[0])[i]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityLog() {
  const activeData = [
    {
      loggedIn: "50 minutes ago",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      current: "true",
    },
  ];

  const activeLabels = [
    "Logged in",
    "Browser",
    "Operation system",
    "IP address",
    "Location",
    "ISP",
    "Current",
  ];

  const recentData = [
    {
      action: "Disable 2FA",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "40 minutes ago",
    },
    {
      action: "Activate 2FA",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "45 minutes ago",
    },
    {
      action: "Login",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "2 hours ago",
    },
    {
      action: "Logout",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "5 hours ago",
    },
    {
      action: "Login",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "6 hours ago",
    },
    {
      action: "Logout",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "8 hours ago",
    },
    {
      action: "Register",
      browser: "Chrome",
      os: "Windows",
      ip: "192.168.10.0",
      location: "USA",
      isp: "Verizon",
      date: "10 hours ago",
    },
  ];

  const recentLabels = [
    "Action",
    "Browser",
    "Operation system",
    "IP address",
    "Location",
    "ISP",
    "Date",
  ];

  return (
    <div className="activity">
      <RecentActivity
        title="Active sessions"
        data={activeData}
        labels={activeLabels}
        flipVertical={true}
      />
      <RecentActivity
        title="Recent activity"
        data={recentData}
        labels={recentLabels}
      />
    </div>
  );
}

export default ActivityLog;
