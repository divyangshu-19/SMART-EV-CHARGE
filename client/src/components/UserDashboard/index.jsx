import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import evData from "../../data/evData.json"; // Import the EV data

const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

function UserDashboard() {
  const { state } = useEth();
  const [formData, setFormData] = useState({
    evModel: "",
    currentPercentage: "",
    targetPercentage: "",
    fullCharge: false,
    askingPrice: "",
    area: ""
  });
  const [calculatedWattage, setCalculatedWattage] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);
  const [providerIndex, setProviderIndex] = useState(null);

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
      return;
    }

    const { capacity } = selectedEV;
    const currentPercentage = parseInt(formData.currentPercentage);
    const targetPercentage = formData.fullCharge ? 100 : parseInt(formData.targetPercentage);

    if (isNaN(currentPercentage) || isNaN(targetPercentage)) {
      setCalculatedWattage(null);
      return;
    }

    const electricityNeeded = ((targetPercentage - currentPercentage) / 100) * capacity; // Convert kWh to Wh
    setCalculatedWattage(electricityNeeded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!calculatedWattage) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const result = await state.contract.methods
        .getProviderWithLeastSellingPrice(formData.area, calculatedWattage, parseInt(formData.askingPrice))
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

  const handleChargeRequest = async () => {
    if (providerIndex === null) return;

    try {
      await state.contract.methods.requestCharge(providerIndex).send({ from: state.accounts[0] });
      alert("Charge request sent!");
    } catch (err) {
      console.error(err);
      alert("Failed to send charge request.");
    }
  };

  const UserDashboardContent = (
    <>
      <div>
        <h3>User Information</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Select EV Model:
            <select name="evModel" value={formData.evModel} onChange={handleChange} required>
              <option value="">Select EV</option>
              {evData.map((ev, index) => (
                <option key={index} value={ev.model}>
                  {ev.model}
                </option>
              ))}
            </select>
          </label> <br></br>
          <label> 
            Buying Price: 
            <input
              type="number"
              name="askingPrice"
              value={formData.askingPrice}
              onChange={handleChange}
              required
            />
          </label><br></br>
          <label>
            Current Battery Percentage:
            <input
              type="number"
              name="currentPercentage"
              value={formData.currentPercentage}
              onChange={handleChange}
              required
            />
          </label><br></br>
          <label>
            Target Battery Percentage:
            <input
              type="number"
              name="targetPercentage"
              value={formData.targetPercentage}
              onChange={handleChange}
              disabled={formData.fullCharge}
              required={!formData.fullCharge}
            />
            <button type="button" onClick={handleFullCharge}>Full Charge</button>
          </label><br></br>
          <label>
            Area/Region:
            <select name="area" value={formData.area} onChange={handleChange} required>
              <option value="">Select Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Find Provider</button><br></br>
        </form>
        {calculatedWattage !== null && (
          <div>
            <h4>Calculated Wattage: {calculatedWattage} W/h</h4>
          </div>
        )}
      </div>
      {providerInfo && (
        <div>
          <h3>Provider Information</h3>
          <div>
            <p>Name: {providerInfo.name}</p>
            <p>Business Name: {providerInfo.businessName}</p>
            <p>Area: {providerInfo.area}</p>
            <p>Available Electricity: {providerInfo.availableElectricity}</p>
            <p>Selling Price: {providerInfo.sellingPrice}</p>
            <p>Physical Address: {providerInfo.physicalAddress}</p>
            <p>Wallet Address: {providerInfo.walletAddress}</p>
            <p>Perks: {providerInfo.perks}</p>
            <button onClick={handleChargeRequest}>Charge Request</button>
            <hr />
          </div>
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
