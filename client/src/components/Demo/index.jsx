import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Demo() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  const [arrayValues, setArrayValues] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  const pushValue = async () => {
    if (inputValue === "") {
      alert("Please enter a value to push.");
      return;
    }
    const newValue = parseInt(inputValue);
    await state.contract.methods.pushValue(newValue).send({ from: state.accounts[0] });
    setInputValue("");
    readArray(); // Refresh array values after pushing a new one
  };

  const demo =
    <>
      <div className="contract-container">
        <Contract value={value} />
        <ContractBtns setValue={setValue} />
      </div>
      <hr />
      <div>
        <h3>Array Values</h3>
        <div>{arrayValues.join(", ")}</div>
      </div>
      <hr />
      <div>
        <h3>Add Provider Information</h3>
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
      <button onClick={readArray}>Read Array</button>
    </>;

  return (
    <div className="demo">
      { !state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : demo }
    </div>
  );
}

export default Demo;
