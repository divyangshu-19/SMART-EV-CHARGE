import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function ProviderDashbord() {
  const { state } = useEth();
  const [arrayValues, setArrayValues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    availableElectricity: "",
    sellingPrice: "",
    providerAddress: "",
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
        parseInt(formData.availableElectricity),
        parseInt(formData.sellingPrice),
        formData.providerAddress,
        formData.walletAddress
      )
      .send({ from: state.accounts[0] });
    setFormData({
      name: "",
      availableElectricity: "",
      sellingPrice: "",
      providerAddress: "",
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

  const ProviderDashbord =
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
            Provider Address:
            <input
              type="text"
              name="providerAddress"
              value={formData.providerAddress}
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
            <p>Available Electricity: {provider.availableElectricity}</p>
            <p>Selling Price: {provider.sellingPrice}</p>
            <p>Provider Address: {provider.providerAddress}</p>
            <p>Wallet Address: {provider.walletAddress}</p>
            <hr />
          </div>
        ))}
      </div>
    </>;

  return (
    <div className="ProviderDashbord">
      { !state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : ProviderDashbord }
    </div>
  );
}

export default ProviderDashbord;
