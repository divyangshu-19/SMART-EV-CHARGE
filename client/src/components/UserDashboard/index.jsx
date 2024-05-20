import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import ProviderList from "./ProviderList";

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
      let providers;
      if (formData.electricityNeeded) {
        providers = await state.contract.methods
          .getProvidersByRegionAndElectricity(formData.area, formData.electricityNeeded)
          .call();
      } else {
        providers = await state.contract.methods
          .getProvidersByRegion(formData.area)
          .call();
      }
      setProviderInfo(providers);
    } catch (err) {
      console.error(err);
      setProviderInfo([]); // No providers found or error occurred
    }
  };

  const handleChargeRequest = async (index) => {
    try {
      await state.contract.methods.requestCharge(index).send({ from: state.accounts[0] });
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
        <ProviderList providerInfo={providerInfo} handleChargeRequest={handleChargeRequest} />
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
