// import { useState, useEffect } from "react";
// import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "./NoticeNoArtifact";
// import NoticeWrongNetwork from "./NoticeWrongNetwork";
// import ProviderStatus from "./ProviderStatus";
// import ProviderArray from "./ProviderArray";

// const regions = ["Region1", "Region2", "Region3"];
// function ProviderDashboard() {
//   const { state } = useEth();
//   const [arrayValues, setArrayValues] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     businessName: "",
//     area: "",
//     availableElectricity: "",
//     sellingPrice: "",
//     physicalAddress: "",
//     walletAddress: "",
//     perks: ""
//   });
//   const [showStatus, setShowStatus] = useState(false);
//   const [providerStatus, setProviderStatus] = useState({
//     currentCharge: '',
//     sellingRate: '',
//     estimatedEarnings: '',
//     statusMessage: 'Waiting for a user'
//   });

//   useEffect(() => {
//     readArray();
  // }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await state.contract.methods
  //     .addProvider(
  //       formData.name,
  //       formData.businessName,
  //       formData.area,
  //       parseInt(formData.availableElectricity),
  //       parseInt(formData.sellingPrice),
  //       formData.physicalAddress,

  // below is COMMENT
        // formData.walletAddress,
    //     formData.perks
    //   )
    //   .send({ from: state.accounts[0] });

    // setFormData({
    //   name: "",
    //   businessName: "",
    //   area: "",
    //   availableElectricity: "",
    //   sellingPrice: "",
    //   physicalAddress: "",
    //   walletAddress: "",
    //   perks: ""
    // });

  //   readArray(); 
  //   setShowStatus(true); 
  // };

  // const readArray = async () => {
  //   const count = await state.contract.methods.getProvidersCount().call({
  //     from: state.accounts[0]
  //   });
  //   const values = [];
  //   for (let i = 0; i < count; i++) {
  //     const provider = await state.contract.methods.getProvider(i).call({
  //       from: state.accounts[0]
  //     });
  //     const statusMessage = await state.contract.methods.providerStatus(i).call();
  //     values.push({ ...provider, statusMessage });
  //   }
  //   setArrayValues(values);
  // };

  // const fetchProviderStatus = async () => {
  //   const index = (await state.contract.methods.getProvidersCount().call({
  //     from: state.accounts[0]
  //   })) - 1;

  //   if (index >= 0) {
  //     const provider = await state.contract.methods.getProvider(index).call({
  //       from: state.accounts[0]
  //     });

  //     const currentCharge = await state.contract.methods.getCurrentCharge(index).call({
  //       from: state.accounts[0]
  //     });

  //     const sellingRate = provider[4];
  //     const estimatedEarnings = currentCharge * sellingRate;

  //     const statusMessage = await state.contract.methods.providerStatus(index).call();

  //     setProviderStatus({
  //       currentCharge: currentCharge,
  //       sellingRate: sellingRate,
  //       estimatedEarnings: estimatedEarnings,
  //       statusMessage: statusMessage
  //     });
  //   }
  // };

  // const ProviderDashboardContent = (
  //   <>
  //     <div>
  //       <h3>Provider Information</h3>
  //       <form onSubmit={handleSubmit}>
  //         <label>
  //           Name:
  //           <input
  //             type="text"
  //             name="name"
  //             value={formData.name}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label><br /><br />
  //         <label>
  //           Business Name:
  //           <input
  //             type="text"
  //             name="businessName"
  //             value={formData.businessName}
  //             onChange={handleChange}
  //           />
  //         </label><br /><br />
  //         <label>
  //           Area/Region:
  //           <select name="area" value={formData.area} onChange={handleChange} required>
  //             <option value="">Select Region</option>
  //             {regions.map((region, index) => (
  //               <option key={index} value={region}>
  //                 {region}
  //               </option>
  //             ))}
  //           </select>
  //         </label><br /><br />
  //         <label>
  //           Available Electricity:
  //           <input
  //             type="number"
  //             name="availableElectricity"
  //             value={formData.availableElectricity}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label><br /><br />
  //         <label>
  //           Selling Price:
  //           <input
  //             type="number"
  //             name="sellingPrice"
  //             value={formData.sellingPrice}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label><br /><br />
  //         <label>
  //           Physical Address:
  //           <input
  //             type="text"
  //             name="physicalAddress"
  //             value={formData.physicalAddress}
  //             onChange={handleChange}
  //             required
  //           />
  //         </label><br /><br />

  // below is COMMENT
          //  <label>
          //   Wallet Address:
          //   <input
          //     type="text"
          //     name="walletAddress"
          //     value={formData.walletAddress}
          //     onChange={handleChange}
          //     required
          //   />
          // </label> 

          
  //         <label>
  //           Perks:
  //           <input
  //             type="text"
  //             name="perks"
  //             value={formData.perks}
  //             onChange={handleChange}
  //           />
  //         </label><br /><br />
  //         <button type="submit">Add Provider</button>
  //       </form>
  //     </div>
  //     {showStatus && (
  //       <ProviderStatus
  //         providerStatus={providerStatus}
  //         fetchProviderStatus={fetchProviderStatus}
  //       />
  //     )}
  //     <hr />
  //     <ProviderArray arrayValues={arrayValues} readArray={readArray} />
  //   </>
  // );

//   return (
//     <div className="ProviderDashboard">
//       {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : ProviderDashboardContent}
//     </div>
//   );
// }

// export default ProviderDashboard;


















import React, { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import ProviderStatus from "./ProviderStatus";
import ProviderArray from "./ProviderArray";
import './Provide.css';

const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

function ProviderDashboard() {
  const { state } = useEth();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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

      const currentCharge = await state.contract.methods.getCurrentCharge(index).call({
        from: state.accounts[0]
      });

      const sellingRate = provider[4]; // sellingPrice is the 5th element in the provider tuple
      const estimatedEarnings = currentCharge * sellingRate;

      const statusMessage = await state.contract.methods.providerStatus(index).call();

      setProviderStatus({
        currentCharge: currentCharge,
        sellingRate: sellingRate,
        estimatedEarnings: estimatedEarnings,
        statusMessage: statusMessage
      });
    }
  };

  const renderContent = () => {
    if (activeSection === 'Dashboard') {
      return (
        <>
          <div className="card">
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
              </label><br />
              <label>
                Business Name:
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </label><br />
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
              </label><br />
              <label>
                Available Electricity:
                <input
                  type="number"
                  name="availableElectricity"
                  value={formData.availableElectricity}
                  onChange={handleChange}
                  required
                />
              </label><br />
              <label>
                Selling Price:
                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </label><br />
              <label>
                Physical Address:
                <input
                  type="text"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleChange}
                  required
                />
              </label><br />
              <label>
                Perks:
                <input
                  type="text"
                  name="perks"
                  value={formData.perks}
                  onChange={handleChange}
                />
              </label><br />
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
    } else if (activeSection === 'Payment') {
      return (
        <div className="card">
          <h3>Payment</h3>
          <ul>
            <li>Transaction 1: $50 - 01/01/2024</li>
            <li>Transaction 2: $75 - 01/02/2024</li>
            <li>Transaction 3: $100 - 01/03/2024</li>
            {/* Add more transactions here */}
          </ul>
        </div>
      );
    } else if (activeSection === 'Support') {
      return (
        <div className="card">
          <h3>Support</h3>
          <textarea placeholder="Write your concern here..." rows="10" style={{ width: '100%', padding: '10px' }}></textarea>
          <button style={{ marginTop: '10px' }}>Submit</button>
        </div>
      );
    }
  };

  return (
    <div className={`ProviderDashboard ${darkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar">
        <div className="provider-info">
          <h2>Hi Provider</h2>
        </div>
        <ul className="menu">
          <li
            className={activeSection === 'Dashboard' ? 'active' : ''}
            onClick={() => handleSectionChange('Dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeSection === 'Payment' ? 'active' : ''}
            onClick={() => handleSectionChange('Payment')}
          >
            Payment
          </li>
          <li
            className={activeSection === 'Support' ? 'active' : ''}
            onClick={() => handleSectionChange('Support')}
          >
            Support
          </li>
        </ul>
        <div className="bottom-options">
          <button className="dark-mode-toggle" onClick={handleToggleDarkMode}>
            Dark Mode
          </button>
          <button className="logout-button">Logout</button>
        </div>
      </div>
      <div className="content">
        {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : renderContent()}
      </div>
    </div>
  );
}

export default ProviderDashboard;
