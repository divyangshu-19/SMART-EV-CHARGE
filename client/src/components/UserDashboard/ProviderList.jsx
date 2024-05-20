import React from 'react';

const ProviderList = ({ providerInfo, handleChargeRequest }) => {
  return (
    <div>
      <h3>Provider Information</h3>
      {providerInfo.map((provider, index) => (
        <div key={index}>
          <p>Name: {provider.name}</p>
          <p>Business Name: {provider.businessName}</p>
          <p>Area: {provider.area}</p>
          <p>Available Electricity: {provider.availableElectricity}</p>
          <p>Selling Price: {provider.sellingPrice}</p>
          <p>Physical Address: {provider.physicalAddress}</p>
          <p>Wallet Address: {provider.walletAddress}</p>
          <p>Perks: {provider.perks}</p>
          <button onClick={() => handleChargeRequest(index)}>Charge Request</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProviderList;
