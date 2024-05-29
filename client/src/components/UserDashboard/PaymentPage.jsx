import React, { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
// import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import Web3 from "web3";

function PaymentPage({ providerInfo, calculatedWattage, onPaymentComplete }) {
  const { state } = useEth();

  const totalAmount = (providerInfo.sellingPrice * calculatedWattage * 0.0000031456118985072425).toFixed(10).toString(); // If we cosider real value then this will work.
  // const totalAmount = providerInfo.sellingPrice * calculatedWattage*0.00003; // If we make the trasaction visible by the amount then this will work.

  const [transactionHash, setTransactionHash] = useState(null);
  const recipient = providerInfo.walletAddress;
  // const amount = "0.5"; // For Tesing

  const handleTransfer = async () => {
    if (!Web3.utils.isAddress(recipient)) {
      alert("Invalid recipient address");
      return;
    }

  const amountInWei = Web3.utils.toWei(totalAmount, "ether");

    try {
      const tx = await state.contract.methods
        .transferEther(recipient, amountInWei)
        .send({ from: state.accounts[0], value: amountInWei });
      setTransactionHash(tx.transactionHash);
      alert("Transfer successful!");
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Transfer failed. Please check the console for details.");
    }
  }
    

  return (
    <div>
      <h3>Payment Page</h3>
      <p>Provider: {providerInfo.name}</p>
      <p>Business: {providerInfo.businessName}</p>
      <p>Physical Address: {providerInfo.physicalAddress}</p>
      <p>Total Electricity Required: {calculatedWattage} KW</p>
      <p>Selling Price: {providerInfo.sellingPrice} KW/Rs</p>
      <p>Total Amount Payable: {totalAmount} Ethers</p>
      <p>Recipient Address: {providerInfo.walletAddress}</p>
      <p> <button onClick={handleTransfer && onPaymentComplete}> Pay </button> </p>
      {/* <button onClick={() => alert("Proceed to Payment")}>Proceed to Payment</button> */}
      {/* <button onClick={onPaymentComplete}>Payment Complete</button> */}
      <div>
      <br />
      {transactionHash && (
        <div>
          <p>Go to the charging location: {providerInfo.physicalAddress}</p>
          <p>Transaction Hash: {transactionHash}</p>
        </div>
      )}
    </div>
    </div>
    
  );
}
export default PaymentPage;
