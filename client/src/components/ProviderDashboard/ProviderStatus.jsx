// ProviderStatus.jsx
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
      <p>{providerStatus.statusMessage}</p>
    </div>
  );
}

export default ProviderStatus;
