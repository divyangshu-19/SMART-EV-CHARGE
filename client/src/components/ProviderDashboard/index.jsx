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
    walletAddress: "",
    perks: ""
  });
  const [showStatus, setShowStatus] = useState(false);
  const [providerStatus, setProviderStatus] = useState({
    currentCharge: '',
    sellingRate: '',
    estimatedEarnings: '',
    statusMessage: 'Waiting for a user'
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
        // formData.walletAddress,
        formData.perks
      )
      .send({ from: state.accounts[0] });

    setFormData({
      name: "",
      businessName: "",
      area: "",
      availableElectricity: "",
      sellingPrice: "",
      physicalAddress: "",
      walletAddress: "",
      perks: ""
    });

    readArray(); // Refresh array values after adding a new provider
    fetchProviderStatus(); // Fetch the latest provider status
    setShowStatus(true); // Show the status section
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

  const fetchProviderStatus = async () => {
    // Assuming we're interested in the status of the last added provider
    const index = (await state.contract.methods.getProvidersCount().call({
      from: state.accounts[0]
    })) - 1;

    if (index >= 0) {
      const provider = await state.contract.methods.getProvider(index).call({
        from: state.accounts[0]
      });

      const currentCharge = await state.contract.methods.getCurrentCharge(index).call({
        from: state.accounts[0]
      });

      const sellingRate = provider[4]; // sellingPrice is the 5th element in the provider tuple
      const estimatedEarnings = currentCharge * sellingRate;

      setProviderStatus({
        currentCharge: currentCharge,
        sellingRate: sellingRate,
        estimatedEarnings: estimatedEarnings,
        statusMessage: 'Waiting for a user'
      });
    }
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
              required
            />
          </label><br /><br />
          <label>
            Business Name:
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
            />
          </label><br /><br />
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
          </label><br /><br />
          <label>
            Available Electricity:
            <input
              type="number"
              name="availableElectricity"
              value={formData.availableElectricity}
              onChange={handleChange}
              required
            />
          </label><br /><br />
          <label>
            Selling Price:
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
              required
            />
          </label><br /><br />
          <label>
            Physical Address:
            <input
              type="text"
              name="physicalAddress"
              value={formData.physicalAddress}
              onChange={handleChange}
              required
            />
          </label><br /><br />
          {/* <label>
            Wallet Address:
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              required
            />
          </label> */}
          <label>
            Perks:
            <input
              type="text"
              name="perks"
              value={formData.perks}
              onChange={handleChange}
            />
          </label><br /><br />
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
            <p>Perks: {provider.perks}</p>
            <hr />
          </div>
        ))}
      </div>
      {showStatus && (
        <div>
          <h2>Provider Current Status</h2>
          <p>Current Charge: {providerStatus.currentCharge}</p>
          <p>Selling Rate: {providerStatus.sellingRate}</p>
          <p>Estimated Earnings: {providerStatus.estimatedEarnings}</p>
          <p>{providerStatus.statusMessage}</p>
        </div>
      )}
    </>
  );

  return (
    <div className="ProviderDashboard">
      {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : ProviderDashboardContent}
    </div>
  );
}

export default ProviderDashboard;
