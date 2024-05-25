import React, { useEffect } from "react";

function ProviderStatus({ providerStatus, fetchProviderStatus }) {
  useEffect(() => {
    fetchProviderStatus();
  }, [fetchProviderStatus]);

  return (
    <div>
      <h2>Provider Current Status</h2>
      <p>Current Charge: {providerStatus.currentCharge}</p>
      <p>Selling Rate: {providerStatus.sellingRate}</p>
      <p>Estimated Earnings: {providerStatus.estimatedEarnings}</p>
      <p>Status: {providerStatus.statusMessage}</p>
      {providerStatus.recentTransactions && providerStatus.recentTransactions.length > 0 && (
        <>
          <h3>Recent Transactions</h3>
          <ul>
            {providerStatus.recentTransactions.map((transaction, index) => (
              <li key={index}>
                EV Model: {transaction.evModel} - Bought {transaction.electricityNeeded} kWh for {transaction.sellingPrice} per kWh - Total: {transaction.amountPaid}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProviderStatus;
