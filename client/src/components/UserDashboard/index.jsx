import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import evData from "../../data/evData.json"; // Import the EV data
import PaymentPage from "./PaymentPage"; // Import the PaymentPage component

const regions = ["Region1", "Region2", "Region3"]; 
const charging = ["5 kW - AC Level 1 (Slow Charging)", "10 kW - AC Level 2 (Fast Charging)", "50 kW - DC Fast Charging"]; 

function UserDashboard() {
  const { state } = useEth();
  const initialFormData = {
    evModel: "",
    chargingSpeed: "",
    currentPercentage: "",
    targetPercentage: "",
    fullCharge: false,
    askingPrice: "", 
    area: ""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [calculatedWattage, setCalculatedWattage] = useState(null);
  const [chargingTime, setChargingTime] = useState(null); // New state for charging time
  const [providerInfo, setProviderInfo] = useState(null);
  const [providerIndex, setProviderIndex] = useState(null);
  const [proceedToPayment, setProceedToPayment] = useState(false);
  // const [paymentComplete, setPaymentComplete] = useState(false); // New state

  useEffect(() => {
    if (formData.evModel && formData.currentPercentage && (formData.targetPercentage || formData.fullCharge)) {
      calculateWattage();
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFullCharge = () => {
    setFormData({ ...formData, targetPercentage: 100, fullCharge: true });
  };

  const calculateWattage = () => {
    const selectedEV = evData.find(ev => ev.model === formData.evModel);
    if (!selectedEV) {
      setCalculatedWattage(null);
      setChargingTime(null);
      return;
    }

    const { capacity } = selectedEV;
    const currentPercentage = parseInt(formData.currentPercentage);
    const targetPercentage = formData.fullCharge ? 100 : parseInt(formData.targetPercentage);

    if (isNaN(currentPercentage) || isNaN(targetPercentage)) {
      setCalculatedWattage(null);
      return;
    }

    const electricityNeeded = ((targetPercentage - currentPercentage) / 100) * capacity  * 1000; // Convert kWh to Wh
    setCalculatedWattage(electricityNeeded);

    // Calculate charging time
    const chargingSpeedKW = parseFloat(formData.chargingSpeed.split(" ")[0])  * 1000; // Extract charging speed in kW
    const chargingTimeHours = electricityNeeded / chargingSpeedKW; // Time in hours
    const hours = Math.floor(chargingTimeHours);
    const minutes = Math.round((chargingTimeHours - hours) * 60);
    setChargingTime({ hours, minutes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!calculatedWattage) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const result = await state.contract.methods
        .getProviderWithLeastSellingPrice(formData.area, calculatedWattage, parseInt(formData.askingPrice), formData.chargingSpeed) // Add charging speed
        .call();
      setProviderInfo(result[0]);
      setProviderIndex(result[1]);
    } catch (err) {
      console.error(err);
      if (err.message.includes("No providers found in this area")) {
        alert("No providers found in the selected area. Please try a different area or add providers first.");
      } else {
        alert("An error occurred. Please try again.");
      }
      setProviderInfo(null);
      setProviderIndex(null);
    }
  };

  const handleProceedWithProvider = () => {
    setProceedToPayment(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setCalculatedWattage(null);
    setProviderInfo(null);
    setProviderIndex(null);
  };
  //Pahle se hi hidden tha
  // const handlePaymentComplete = () => {
  //   alert("Payment Complete!");
  //   setPaymentComplete(true); // Set payment complete flag
  // };

  //Ye maine hide kiya
  // const handlePaymentComplete = async () => {
  //   setPaymentComplete(true);
  //   if (providerIndex === null) return;
  
  //   const amountPaid = calculatedWattage * providerInfo.sellingPrice;
  
  //   try {
  //     await state.contract.methods.requestCharge(providerIndex, formData.evModel, calculatedWattage, amountPaid).send({ from: state.accounts[0] });
  //     alert("Payment complete! Proceed to your destination and get your EV charged.");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to complete payment.");
  //   }
  // };
  


  const UserDashboardContent = (
    <>
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ flex: "0 0 45%", padding: "20px", background: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center" }}>User Information</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Select EV Model:</label>
            <select name="evModel" value={formData.evModel} onChange={handleChange} required style={{ display: "block", width: "100%", marginTop: "5px", padding: "5px"  }}>
              <option value="">Select EV</option>
              {evData.map((ev, index) => (
                <option key={index} value={ev.model}>
                  {ev.model}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Charging Speed:</label>
            <select name="chargingSpeed" value={formData.chargingSpeed} onChange={handleChange} required style={{ display: "block", width: "100%", marginTop: "5px" , padding: "5px" }}>
              <option value="">Select Charging Speed</option>
              {charging.map((charging, index) => (
                <option key={index} value={charging}>
                  {charging}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Buying Price:</label>
            <input
              type="number"
              name="askingPrice"
              value={formData.askingPrice}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", marginTop: "5px", padding: "5px" }}
              placeholder="Enter Detail"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Current Battery Percentage:</label>
            <input
              type="number"
              name="currentPercentage"
              value={formData.currentPercentage}
              onChange={handleChange}
              required
              style={{ display: "block", width: "100%", marginTop: "5px" , padding: "5px" }}
              placeholder="Enter Detail"
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Target Battery Percentage:</label>
            <input
              type="number"
              name="targetPercentage"
              value={formData.targetPercentage}
              onChange={handleChange}
              disabled={formData.fullCharge}
              required={!formData.fullCharge}
              style={{ display: "block", width: "100%", marginTop: "5px", padding: "5px"  }}
              placeholder="Enter Detail"
            />
            <button type="button" onClick={handleFullCharge} style={{ marginTop: "5px", backgroundColor : "blueviolet", color:'white', border : '1px solid blueviolet', borderRadius:'5px'}}>Full Charge</button>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Area/Region:</label>
            <select name="area" value={formData.area} onChange={handleChange} required style={{ display: "block", width: "100%", marginTop: "5px" , padding: "5px" }}>
              <option value="">Select Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary" style={{ marginTop: "20px" }}>Find Provider</button>
          </div>
        </form>
        {calculatedWattage !== null && (
          <div>
            <h4>Calculated Wattage: {calculatedWattage} KW/h</h4>
          </div>
        )}
        {chargingTime !== null && (
          <div>
            <h4>Estimated Charging Time: {chargingTime.hours} hours and {chargingTime.minutes} minutes</h4>
          </div>
        )}
      </div>
      {providerInfo && !proceedToPayment && (
        <div style={{ flex: "0 0 45%", padding: "20px", background: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h3 style={{ textAlign: "center" }}>Provider Information</h3>
          <div>
            <p>Name: {providerInfo.name}</p>
            <p>Business Name: {providerInfo.businessName}</p>
            <p>Area: {providerInfo.area}</p>
            <p>Available Electricity: {providerInfo.availableElectricity} KW</p>
            <p>Selling Price: {providerInfo.sellingPrice}KW/Rs</p>
              <p>Physical Address: {providerInfo.physicalAddress}</p>
              <p>Wallet Address: {providerInfo.walletAddress}</p>
              <p>Perks: {providerInfo.perks}</p>
              <div style={{ textAlign: "center" }}>
                <button onClick={handleProceedWithProvider} className="btn btn-primary" style={{ marginRight: "10px" }}>Proceed with this Provider</button>
                <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {proceedToPayment && (
        <div style={{ padding: "20px", background: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", marginTop: "20px" }}>
          <PaymentPage
            providerInfo={providerInfo}
            calculatedWattage={calculatedWattage}
            onProviderIndex={providerIndex}
            formData={formData}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="UserDashboard">
      {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : UserDashboardContent}
    </div>
  );
}

export default UserDashboard;
