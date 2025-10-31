import React from "react";
import CustomersTable from "./components/CustomerTable";
import "./App.css";
import logo from "./assets/logo.png"; // Adjust filename as necessary

function App() {
  return (
    <div>
      <img
        src={logo}
        alt="DoubleTick Logo"
        style={{
          height: "32px",
          marginBottom: "12px",
          cursor: "pointer",
        }}
      />
      <h1 style={{ margin: 0, marginBottom: 24 }}>All Customers</h1>
      <CustomersTable />
    </div>
  );
}

export default App;
