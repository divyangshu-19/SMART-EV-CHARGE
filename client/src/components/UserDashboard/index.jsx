// UserDashboard.jsx
import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";

const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

function UserDashboard() {
  const { state } = useEth();
  const [formData, setFormData] = useState({
    area: "",
    electricityNeeded: "",
    willingToPay: "",
    walletAddress: ""
  });
  const [providerInfo, setProviderInfo] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const providers = await state.contract.methods
        .getProvidersByRegion(formData.area)
        .call();
      setProviderInfo(providers);
    } catch (err) {
      console.error(err);
      setProviderInfo([]); // No providers found or error occurred
    }
  };

  const UserDashboardContent = (
    <>
      <div>
        <h3>User Information</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Area/Region:
            <select name="area" value={formData.area} onChange={handleChange}>
              <option value="">Select Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <label>
            Units of Electricity Needed:
            <input
              type="number"
              name="electricityNeeded"
              value={formData.electricityNeeded}
              onChange={handleChange}
            />
          </label>
          <label>
            Willing to Pay Per Unit:
            <input
              type="number"
              name="willingToPay"
              value={formData.willingToPay}
              onChange={handleChange}
            />
          </label>
          <label>
            Wallet Address:
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Find Providers</button>
        </form>
      </div>
      {providerInfo.length > 0 && (
        <div>
          <h3>Provider Information</h3>
          {providerInfo.map((provider, index) => (
            <div key={index}>
              <p>Name: {provider.name}</p>
              <p>Business Name: {provider.businessName}</p>
              <p>Area: {provider.area}</p>
              <p>Available Electricity: {provider.availableElectricity}</p>
              <p>Selling Price: {provider.sellingPrice}</p>
              <p>Physical Address: {provider.physicalAddress}</p>
              <p>Wallet Address: {provider.walletAddress}</p>
              <p>Perks: {provider.perks}</p>
              <hr />
            </div>
          ))}
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
