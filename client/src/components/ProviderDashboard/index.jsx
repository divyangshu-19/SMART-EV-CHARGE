// ProviderDashboard.jsx
import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

function ProviderDashboard() {
  const { state } = useEth();
  const [arrayValues, setArrayValues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    area: "",
    availableElectricity: "",
    sellingPrice: "",
    physicalAddress: "",
    walletAddress: ""
  });

  useEffect(() => {
    readArray();
  }, []); // Load array values on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await state.contract.methods
      .addProvider(
        formData.name,
        formData.businessName,
        formData.area,
        parseInt(formData.availableElectricity),
        parseInt(formData.sellingPrice),
        formData.physicalAddress,
        formData.walletAddress
      )
      .send({ from: state.accounts[0] });
    setFormData({
      name: "",
      businessName: "",
      area: "",
      availableElectricity: "",
      sellingPrice: "",
      physicalAddress: "",
      walletAddress: ""
    });
    readArray(); // Refresh array values after adding a new provider
  };

  const readArray = async () => {
    const count = await state.contract.methods.getProvidersCount().call({
      from: state.accounts[0]
    });
    const values = [];
    for (let i = 0; i < count; i++) {
      const provider = await state.contract.methods.getProvider(i).call({
        from: state.accounts[0]
      });
      values.push(provider);
    }
    setArrayValues(values);
  };

  const ProviderDashboardContent = (
    <>
      <div>
        <h3>Provider Information</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Business Name:
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
          </label>
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
            Available Electricity:
            <input
              type="number"
              name="availableElectricity"
              value={formData.availableElectricity}
              onChange={handleChange}
            />
          </label>
          <label>
            Selling Price:
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
            />
          </label>
          <label>
            Physical Address:
            <input
              type="text"
              name="physicalAddress"
              value={formData.physicalAddress}
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
          <button type="submit">Add Provider</button>
        </form>
      </div>
      <hr />
      <button onClick={readArray}>Read Providers</button>
      <div>
        <h3>Providers List</h3>
        {arrayValues.map((provider, index) => (
          <div key={index}>
            <p>Name: {provider.name}</p>
            <p>Business Name: {provider.businessName}</p>
            <p>Area/Region: {provider.area}</p>
            <p>Available Electricity: {provider.availableElectricity}</p>
            <p>Selling Price: {provider.sellingPrice}</p>
            <p>Physical Address: {provider.physicalAddress}</p>
            <p>Wallet Address: {provider.walletAddress}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="ProviderDashboard">
      {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : ProviderDashboardContent}
    </div>
  );
}

export default ProviderDashboard;
