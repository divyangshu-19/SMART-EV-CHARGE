import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import ProviderStatus from "./ProviderStatus";
import ProviderArray from "./ProviderArray";

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
    statusMessage: 'Waiting for a user',
    recentTransactions: []
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
      const statusMessage = await state.contract.methods.providerStatus(i).call();
      values.push({ ...provider, statusMessage });
    }
    setArrayValues(values);
  };

  const fetchProviderStatus = async () => {
    const index = (await state.contract.methods.getProvidersCount().call({
      from: state.accounts[0]
    })) - 1;

    if (index >= 0) {
      const provider = await state.contract.methods.getProvider(index).call({
        from: state.accounts[0]
      });

      const currentCharge = provider[3]; // Assuming availableElectricity is the 4th element in the provider tuple
      const sellingRate = provider[4]; // sellingPrice is the 5th element in the provider tuple
      const estimatedEarnings = currentCharge * sellingRate;

      const statusMessage = await state.contract.methods.providerStatus(index).call();
      let recentTransactions = [];

      if (statusMessage === "Charge requested") {
        const userRequest = await state.contract.methods.userRequests(index).call();

        recentTransactions.push({
          evModel: userRequest.evModel,
          electricityNeeded: userRequest.electricityNeeded,
          sellingPrice: sellingRate,
          amountPaid: userRequest.amountPaid
        });
      }

      setProviderStatus({
        currentCharge: currentCharge,
        sellingRate: sellingRate,
        estimatedEarnings: estimatedEarnings,
        statusMessage: statusMessage,
        recentTransactions: recentTransactions
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
      {showStatus && (
        <ProviderStatus
          providerStatus={providerStatus}
          fetchProviderStatus={fetchProviderStatus}
        />
      )}
      <hr />
      <ProviderArray arrayValues={arrayValues} readArray={readArray} />
    </>
  );

  return (
    <div className="ProviderDashboard">
      {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : ProviderDashboardContent}
    </div>
  );
}

export default ProviderDashboard;
