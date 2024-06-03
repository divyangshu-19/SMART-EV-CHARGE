import React, { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ProviderStatus() {
  const { state } = useEth();
  const [providerStatus, setProviderStatus] = useState(null);

  const fetchProviderStatus = async () => {
    try {
      const result = await state.contract.methods.getProviderStatusByAddress().call({ from: state.accounts[0] });
      const providerData = {
        provider: result[0],
        statusMessage: result[1],
        recentTransactions: result[2]
      };
      setProviderStatus(providerData);
    } catch (err) {
      console.error("Error fetching provider status:", err);
    }
  };

  useEffect(() => {
    fetchProviderStatus();
  }, [fetchProviderStatus]);

  const calculateEstimatedEarnings = (transactions) => {
    return transactions.reduce((total, transaction) => total + parseFloat(transaction.amountPaid), 0).toFixed(2);
  };

  if (!providerStatus) {
    return <p>Loading...</p>;
  }
  const estimatedEarnings = calculateEstimatedEarnings(providerStatus.recentTransactions);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-3" style={{ width: '22rem', marginTop: '20px', backgroundColor: '#D3D3D3' }}>
        <div className="card-body p-3 bg-light rounded shadow-sm mb-3" style={{ color: 'white' }}>
          <h5 className="card-title text-left">Provider Current Status</h5>
          <p className="card-text text-left">Current Charge: {providerStatus.provider.availableElectricity}</p>
          <p className="card-text text-left">Selling Rate: {providerStatus.provider.sellingPrice}</p>
          <p className="card-text text-left">Estimated Earnings: {estimatedEarnings} Ethers</p>
          <p className="card-text text-left">Status: {providerStatus.statusMessage}</p>
          {providerStatus.recentTransactions && providerStatus.recentTransactions.length > 0 && (
            <>
              <h5 className="text-left">Recent Transactions</h5>
              <ul className="list-group">
                {providerStatus.recentTransactions.map((transaction, index) => (
                  <li key={index} className="list-group-item text-left">
                    EV Model: {transaction.evModel} - Bought {transaction.electricityNeeded} kWh for {transaction.amountPaid} - Total: {transaction.amountPaid}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderStatus;
