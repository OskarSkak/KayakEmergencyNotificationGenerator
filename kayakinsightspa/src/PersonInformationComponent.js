import React from "react";

const PersonInformationComponent = () => {
  return (
    <div>
      <div
        style={{ color: "#f56565", display: "flex", justifyContent: "center" }}
      >
        <h1>Casper had an accident</h1>
      </div>
      <p style={{ padding: 10 }}>
        Casper has been in a kayak accident and is reaching out to you for help.
        Below is some information the telephones condition. On the left is a map
        where you can see the position
      </p>
      <p style={{ fontSize: 20, textAlign: "center" }}>Information</p>
      <span>
        Last location:
        <span style={{ fontWeight: 600 }}> 55.649918, 12.547053</span>
      </span>
      <p>
        Last Update:
        <span style={{ fontWeight: 600 }}> 1min</span>
      </p>
      <p>
        Battery information:
        <span style={{ fontWeight: 600 }}> 20%</span>
      </p>
      <p>
        Time since accident:
        <span style={{ fontWeight: 600 }}> 12min</span>
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 70 }}>
        <button className={"button-style"}>Click here to help</button>
      </div>
    </div>
  );
};

export default PersonInformationComponent;
