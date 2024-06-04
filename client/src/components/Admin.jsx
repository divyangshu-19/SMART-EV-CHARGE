// src/components/Admin.jsx
import React, { useState, useEffect } from 'react';
import useEth from '../contexts/EthContext/useEth';

const Admin = () => {
  const { state } = useEth();
  const [arrayValues, setArrayValues] = useState([]);

  const readArray = async () => {
    if (!state.contract) return;
    const count = await state.contract.methods.getProvidersCount().call({
      from: state.accounts[0]
    });
    const values = [];
    for (let i = 0; i < count; i++) {
      const provider = await state.contract.methods.getProvider(i).call({
        from: state.accounts[0]
      });
      const statusMessage = await state.contract.methods.providerStatus(i).call();
      values.push({ ...provider, statusMessage });
    }
    setArrayValues(values);
  };

  useEffect(() => {
    readArray();
  }, [state.contract]); // Fetch provider data when contract is available

  return (
    <div className="container">
      <h1>Admin Page</h1>
      <button onClick={readArray} className="btn btn-primary">Fetch Providers</button>
      <div className="mt-4">
        {arrayValues.length > 0 ? (
          arrayValues.map((provider, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <p><strong>Name:</strong> {provider.name}</p>
                <p><strong>Business Name:</strong> {provider.businessName}</p>
                <p><strong>Area/Region:</strong> {provider.area}</p>
                <p><strong>Available Electricity:</strong> {provider.availableElectricity}</p>
                <p><strong>Selling Price:</strong> {provider.sellingPrice}</p>
                <p><strong>Charging Speed:</strong> {provider.chargingSpeed}</p>
                <p><strong>Physical Address:</strong> {provider.physicalAddress}</p>
                <p><strong>Wallet Address:</strong> {provider.walletAddress}</p>
                <p><strong>Perks:</strong> {provider.perks}</p>
                <p><strong>Status:</strong> {provider.statusMessage}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No providers found.</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
