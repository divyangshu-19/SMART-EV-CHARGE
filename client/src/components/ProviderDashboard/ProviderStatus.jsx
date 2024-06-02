import React, { useEffect } from "react";

function ProviderStatus({ providerStatus, fetchProviderStatus }) {
  useEffect(() => {
    fetchProviderStatus();
  }, [fetchProviderStatus]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-3" style={{ width: '18rem' , marginTop: '20px'}}>
        <div className="card-body">
          <h5 className="card-title text-left">Provider Current Status</h5>
          <p className="card-text text-left">Current Charge: {providerStatus.currentCharge}</p>
          <p className="card-text text-left">Selling Rate: {providerStatus.sellingRate}</p>
          <p className="card-text text-left">Estimated Earnings: {providerStatus.estimatedEarnings}</p>
          <p className="card-text text-left">Status: {providerStatus.statusMessage}</p>
          {providerStatus.recentTransactions && providerStatus.recentTransactions.length > 0 && (
            <>
              <h5 className="text-left">Recent Transactions</h5>
              <ul className="list-group">
                {providerStatus.recentTransactions.map((transaction, index) => (
                  <li key={index} className="list-group-item text-left">
                    EV Model: {transaction.evModel} - Bought {transaction.electricityNeeded} kWh for {transaction.sellingPrice} per kWh - Total: {transaction.amountPaid}
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
