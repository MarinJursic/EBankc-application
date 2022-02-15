import React from "react";
import "./styles.scss";

import { BsCheck2 } from "react-icons/bs";

function KycLevel() {
  return (
    <div className="box kycLevel">
      <p className="title">KYC level 0</p>
      <div className="progress">
        <div className="line" />
        <div className="circles">
          <div className="circle completed">
            <BsCheck2 color="white" />
          </div>
          <div className="circle">
            <p>1</p>
          </div>
          <div className="circle">
            <p>2</p>
          </div>
        </div>
        <div className="labels">
          <p>Sign Up</p>
          <p>Level 1</p>
          <p>Level 2</p>
        </div>
      </div>
      <button>START KYC LEVEL 1</button>
    </div>
  );
}

function WithdrawalLimits() {
  const data = [
    {
      level: "Level 1",
      daily: "$50,000.00",
      weekly: "$250,000.00",
    },
    {
      level: "Level 2",
      daily: "$1,000,000.00",
      weekly: "$50,000,000.00",
    },
  ];

  return (
    <div className="box withdrawalLimits">
      <p className="title">Withdrawal limits</p>
      <div className="header">
        <p className="start">KYC level</p>
        <p>Daily</p>
        <p className="end">Weekly</p>
      </div>
      <div className="rows">
        {data.map((val, i) => (
          <div className="row" key={i}>
            <p className="start">{val.level}</p>
            <p>{val.daily}</p>
            <p className="end">{val.weekly}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Verification() {
  return (
    <main className="verification">
      <section className="left">
        <KycLevel />
        <WithdrawalLimits />
      </section>
      <section className="right">
        <div className="box importantNote">
          <p className="title">Important note</p>
          <p className="text">
            As a regulated FinTech company, we are required to verify certain
            information about our users. The personal data you provide will be
            processed solely by our partner SumSub.
            <br /> <br /> Prohibited nationalities: American Samoa, Angola,
            Anguilla, Belarus, British Virgin Islands, Cayman Islands, Central
            African Republic, Cote d'Ivoire (Ivory Coast), Cuba, Democratic
            People's Republic of Korea (North Korea), Dominica, DRC (Congo),
            Eritrea, Ethiopia, Fiji, Guinea-Bissau, Guam, Haiti, Iran, Iraq,
            Liberia, Libya, Mali, Myanmar, Palau, Panama, Rwanda, Samoa,
            Seychelles, Sierra Leone, Somalia, South Sudan, Sudan, Syria,
            Thailand, Trinidad and Tobago, Ukraine (Crimea/Sevastopol regions
            residents only), United States of America (as well as its
            residents), US Virgin Islands, Vanuatu, Venezuela, Yemen, Zimbabwe
            <br /> <br />
            For more information, please visit our{" "}
            <a
              href="https://ebankc.netlify.app/faq"
              target="_blank"
              rel="noreferrer"
            >
              help center.
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Verification;
