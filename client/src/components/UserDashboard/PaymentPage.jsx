import React from 'react';

function PaymentPage({ providerInfo, calculatedWattage, onPaymentComplete }) {
  const totalAmount = providerInfo.sellingPrice * calculatedWattage; // Calculate the total amount payable

  return (
    <div>
      <h3>Payment Page</h3>
      <p>Provider: {providerInfo.name}</p>
      <p>Business: {providerInfo.businessName}</p>
      <p>Physical Address: {providerInfo.physicalAddress}</p>
      <p>Total Electricity: {calculatedWattage} Wh</p>
      <p>Selling Price per Wh: {providerInfo.sellingPrice}</p>
      <p>Total Amount Payable: {totalAmount}</p>
      <button onClick={() => alert("Proceed to Payment")}>Proceed to Payment</button>
      <button onClick={onPaymentComplete}>Payment Complete</button>
    </div>
  );
}

export default PaymentPage;
