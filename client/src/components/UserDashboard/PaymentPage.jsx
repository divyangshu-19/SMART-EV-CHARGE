import React, { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
// import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import Web3 from "web3";

function PaymentPage({ providerInfo, calculatedWattage, onProviderIndex, formData }) {
  const { state } = useEth();

  const totalAmount = (providerInfo.sellingPrice * calculatedWattage * 0.0000031456118985072425).toFixed(10).toString(); // If we cosider real value then this will work.
  // const totalAmount = providerInfo.sellingPrice * calculatedWattage*0.00003; // If we make the trasaction visible by the amount then this will work.

  const [transactionHash, setTransactionHash] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false); // New state
  const recipient = providerInfo.walletAddress;
  // const amount = "1"; // For Tesing

  const handleTransfer = async () => {
    setPaymentComplete(true);
    if (onProviderIndex === null) return;
    
    const amountPaid = calculatedWattage * providerInfo.sellingPrice;
    if (!Web3.utils.isAddress(recipient)) {
      alert("Invalid recipient address");
      return;
    }

    const amountInWei = Web3.utils.toWei(totalAmount, "ether");

    try {
      const tx = await state.contract.methods
        .transferEther(onProviderIndex, formData.evModel, calculatedWattage, amountPaid, recipient, amountInWei)
        .send({ from: state.accounts[0], value: amountInWei });
      setTransactionHash(tx.transactionHash);
      alert("Transfer successful!");
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Transfer failed. Please check the console for details.");
      // onPaymentComplete();
    }
  }

  // const handleTransfer = async () => {
  //   if (!Web3.utils.isAddress(recipient)) {
  //     alert("Invalid recipient address");
  //     return;
  //   }

  //   const amountInWei = Web3.utils.toWei(totalAmount, "ether");

  //   try {
  //     const tx = await state.contract.methods
  //       .transferEther(recipient, amountInWei)
  //       .send({ from: state.accounts[0], value: amountInWei });
  //     setTransactionHash(tx.transactionHash);
  //     alert("Transfer successful!");
  //   } catch (err) {
  //     console.error("Transfer failed:", err);
  //     alert("Transfer failed. Please check the console for details.");
  //     // onPaymentComplete();
  //   }
  // }
    
  return (
    <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
      <h3>Payment Page</h3>
      <p>Provider: {providerInfo.name}</p>
      <p>Business: {providerInfo.businessName}</p>
      <p>Physical Address: {providerInfo.physicalAddress}</p>
      <p>Total Electricity Required: {calculatedWattage} KW</p>
      <p>Selling Price: {providerInfo.sellingPrice} KW/Rs</p>
      <p>Total Amount Payable: {totalAmount} Ethers</p>
      <p>Recipient Address: {providerInfo.walletAddress}</p>
      <button onClick={handleTransfer} className="btn btn-primary" style={{ marginTop: "20px" }}>Pay</button>
      <div style={{ marginTop: "20px" }}>
        {paymentComplete && (
          <div>
            <h4>Payment successful!</h4>
          </div>
        )}
        {transactionHash && (
          <div style={{ padding: "10px", background: "#ffffff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginTop: "20px" }}>
            <p>Go to the charging location: {providerInfo.physicalAddress}</p>
            <p>Transaction Hash: {transactionHash}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default PaymentPage;
