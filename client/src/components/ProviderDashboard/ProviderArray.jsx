// ProviderArray.jsx
import React from "react";

function ProviderArray({ arrayValues, readArray }) {
  return (
    <div>
      <button onClick={readArray}>Read Providers</button>
      <div>
        <h3>Providers List</h3>
        {arrayValues.map((provider, index) => (
          <div key={index}>
            <p>Name: {provider.name}</p>
            <p>Business Name: {provider.businessName}</p>
            <p>Area/Region: {provider.area}</p>
            <p>Available Electricity: {provider.availableElectricity}</p>
            <p>Selling Price: {provider.sellingPrice}</p>
            <p>Physical Address: {provider.physicalAddress}</p>
            <p>Wallet Address: {provider.walletAddress}</p>
            <p>Perks: {provider.perks}</p>
            <p>Status: {provider.statusMessage}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProviderArray;
