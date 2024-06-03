import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import ProviderStatus from "./ProviderStatus";
import ProviderArray from "./ProviderArray";


const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed
const charging = ["5 kW - AC Level 1 (Slow Charging)", "10 kW - AC Level 2 (Fast Charging)", "50 kW - DC Fast Charging"]; // Add charging speed profiles

function ProviderDashboard() {
  const { state } = useEth();
  const [arrayValues, setArrayValues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    area: "",
    availableElectricity: "",
    sellingPrice: "",
    chargingSpeed: "",
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
        formData.chargingSpeed,
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
      chargingSpeed: "",
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
     <div className="container-fluid ">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-3 p-3 fit-height-1 bg-light rounded shadow-sm mb-3" style={{ paddingTop: '15px', marginTop: '15px', borderRadius : '20px', marginLeft: '15px', backgroundColor: '#26334f' }}>
            <div className="card-header">
              <h3 style={{ textAlign: 'center', color : 'white' }}> Provider Information</h3>
            </div>
            <div className="card-body" style= {{ color : 'white'}}>
           

              <form onSubmit={handleSubmit}  style={{color: 'white',  padding: '10px', marginTop: '5px' }}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input type="text" className="form-control  input-text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Detail" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="businessName" className="form-label">Business Name:</label>
                  <input type="text" className="form-control input-text" id="businessName" name="businessName" placeholder="Enter Detail" value={formData.businessName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="area" className="form-label">Area/Region:</label>
                  <select className="form-select input-text" id="area" name="area" value={formData.area} onChange={handleChange} required>
                    <option value="">Select Region</option>
                    {regions.map((region, index) => (
                      <option key={index} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="availableElectricity" className="form-label">Available Electricity:</label>
                  <input type="number" className="form-control input-text" id="availableElectricity" name="availableElectricity" placeholder="Enter Detail" value={formData.availableElectricity} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="sellingPrice" className="form-label">Selling Price:</label>
                  <input type="number" className="form-control input-text" id="sellingPrice" name="sellingPrice" placeholder="Enter Detail" value={formData.sellingPrice} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="chargingSpeed" className="form-label">Charging Speed:</label>
                  <select className="form-select input-text" id="chargingSpeed" name="chargingSpeed" value={formData.chargingSpeed} onChange={handleChange} required>
                    <option value="">Select Charging Speed</option>
                    {charging.map((charging, index) => (
                      <option key={index} value={charging}>{charging}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="physicalAddress" className="form-label">Physical Address:</label>
                  <input type="text" className="form-control input-text" id="physicalAddress" name="physicalAddress" placeholder="Enter Detail" value={formData.physicalAddress} onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="perks" className="form-label">Perks:</label>
                  <input type="text" className="form-control input-text" id="perks" name="perks" placeholder="Enter Detail" value={formData.perks} onChange={handleChange} />
                </div>
                <button type="submit" className="btn" style={{ backgroundColor : '#216a94', color : 'white'}}>Add Provider</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {showStatus && (
            <ProviderStatus/>
          )}
        </div>
      </div>
    </div>
  


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
