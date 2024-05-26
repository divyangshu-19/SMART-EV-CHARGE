// import { useState, useEffect } from "react";
// import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
// import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
// import evData from "../../data/evData.json"; // Import the EV data

// const regions = ["Region1", "Region2", "Region3"]; 

// function UserDashboard() {
//   const { state } = useEth();
//   const [formData, setFormData] = useState({
//     evModel: "",
//     currentPercentage: "",
//     targetPercentage: "",
//     fullCharge: false,
//     area: ""
//   });
//   const [calculatedWattage, setCalculatedWattage] = useState(null);
//   const [providerInfo, setProviderInfo] = useState(null);
//   const [providerIndex, setProviderIndex] = useState(null);

//   useEffect(() => {
//     if (formData.evModel && formData.currentPercentage && (formData.targetPercentage || formData.fullCharge)) {
//       calculateWattage();
//     }
//   }, [formData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFullCharge = () => {
//     setFormData({ ...formData, targetPercentage: 100, fullCharge: true });
//   };

//   const calculateWattage = () => {
//     const selectedEV = evData.find(ev => ev.model === formData.evModel);
//     if (!selectedEV) {
//       setCalculatedWattage(null);
//       return;
//     }

//     const { capacity } = selectedEV;
//     const currentPercentage = parseInt(formData.currentPercentage);
//     const targetPercentage = formData.fullCharge ? 100 : parseInt(formData.targetPercentage);

//     if (isNaN(currentPercentage) || isNaN(targetPercentage)) {
//       setCalculatedWattage(null);
//       return;
//     }

//     const electricityNeeded = ((targetPercentage - currentPercentage) / 100) * capacity; // Convert kWh to Wh
//     setCalculatedWattage(electricityNeeded);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!calculatedWattage) {
//       alert("Please fill in all required fields correctly.");
//       return;
//     }

//     try {
//       const result = await state.contract.methods
//         .getProviderWithLeastSellingPrice(formData.area, calculatedWattage)
//         .call();
//       setProviderInfo(result[0]);
//       setProviderIndex(result[1]);
//     } catch (err) {
//       console.error(err);
//       if (err.message.includes("No providers found in this area")) {
//         alert("No providers found in the selected area. Please try a different area or add providers first.");
//       } else {
//         alert("An error occurred. Please try again.");
//       }
//       setProviderInfo(null);
//       setProviderIndex(null);
//     }
//   };

//   const handleChargeRequest = async () => {
//     if (providerIndex === null) return;

//     try {
//       await state.contract.methods.requestCharge(providerIndex).send({ from: state.accounts[0] });
//       alert("Charge request sent!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to send charge request.");
//     }
//   };

//   const UserDashboardContent = (
//     <>
//       <div>
//         <h3>User Information</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Select EV Model:
//             <select name="evModel" value={formData.evModel} onChange={handleChange} required>
//               <option value="">Select EV</option>
//               {evData.map((ev, index) => (
//                 <option key={index} value={ev.model}>
//                   {ev.model}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//             Current Battery Percentage:
//             <input
//               type="number"
//               name="currentPercentage"
//               value={formData.currentPercentage}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Target Battery Percentage:
//             <input
//               type="number"
//               name="targetPercentage"
//               value={formData.targetPercentage}
//               onChange={handleChange}
//               disabled={formData.fullCharge}
//               required={!formData.fullCharge}
//             />
//             <button type="button" onClick={handleFullCharge}>Full Charge</button>
//           </label>
//           <label>
//             Area/Region:
//             <select name="area" value={formData.area} onChange={handleChange} required>
//               <option value="">Select Region</option>
//               {regions.map((region, index) => (
//                 <option key={index} value={region}>
//                   {region}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <button type="submit">Find Provider</button>
//         </form>
//         {calculatedWattage !== null && (
//           <div>
//             <h4>Calculated Wattage: {calculatedWattage} Wh</h4>
//           </div>
//         )}
//       </div>
//       {providerInfo && (
//         <div>
//           <h3>Provider Information</h3>
//           <div>
//             <p>Name: {providerInfo.name}</p>
//             <p>Business Name: {providerInfo.businessName}</p>
//             <p>Area: {providerInfo.area}</p>
//             <p>Available Electricity: {providerInfo.availableElectricity}</p>
//             <p>Selling Price: {providerInfo.sellingPrice}</p>
//             <p>Physical Address: {providerInfo.physicalAddress}</p>
//             <p>Wallet Address: {providerInfo.walletAddress}</p>
//             <p>Perks: {providerInfo.perks}</p>
//             <button onClick={handleChargeRequest}>Charge Request</button>
//             <hr />
//           </div>
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="UserDashboard">
//       {!state.artifact ? <NoticeNoArtifact /> : !state.contract ? <NoticeWrongNetwork /> : UserDashboardContent}
//     </div>
//   );
// }

// export default UserDashboard;




















// UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
// import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";
import evData from "../../data/evData.json";
import './userDash.css';

const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

function UserDashboard() {
  const { state } = useEth();
  const [formData, setFormData] = useState({
    evModel: "",
    currentPercentage: "",
    targetPercentage: "",
    fullCharge: false,
    area: ""
  });
  const [calculatedWattage, setCalculatedWattage] = useState(null);
  const [providerInfo, setProviderInfo] = useState(null);
  const [providerIndex, setProviderIndex] = useState(null);
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(false);

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
        .getProviderWithLeastSellingPrice(formData.area, calculatedWattage)
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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    if (activeSection === 'Dashboard') {
      return (
        <>
        <div className="card-container"> 

        <div  className={`card user-info-card`} >
            <h3>Please Enter Information</h3>
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
              </label>
              <label>
                Current Battery Percentage:
                <input
                  type="number"
                  name="currentPercentage"
                  value={formData.currentPercentage}
                  onChange={handleChange}
                  required
                />
              </label>
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
              </label>
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
              <button type="submit">Find Provider</button>
            </form>
            {calculatedWattage !== null && (
              <div>
                <p className="user-p-tag">Calculated Wattage: {calculatedWattage} Wh</p>
              </div>
            )}
          </div>

          {providerInfo && (
            <div className={`card provider-info-card`} >
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


        </div>
        </>
      );
    } else if (activeSection === 'PaymentHistory') {
      return (
        <div className="card">
          <h3>Payment History</h3>
          <ul>
            <li>Transaction 1: $50 - 01/01/2024</li>
            <li>Transaction 2: $75 - 01/02/2024</li>
            <li>Transaction 3: $100 - 01/03/2024</li>
            {/* Add more transactions here */}
          </ul>
        </div>
      );
    } else if (activeSection === 'Insurance') {
      return (
        <div className="card">
          <h3>Insurance Information</h3>
          <p>Insurance Provider: Auto Insure Co.</p>
          <p>Policy Number: ABC123456</p>
          <p>Expiry Date: 01/01/2025</p>
          {/* Add more insurance information here */}
        </div>
      );
    }
  };

  return (
    <div className={`UserDashboard ${darkMode ? 'dark-mode' : ''}`}  style={{ backgroundImage: `url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0yODMtbnVubnktMTg2LWcuanBn.jpg')` }}>
      <div className="sidebar">
        <div className="user-info">
          <h2>Hi Consumer</h2>
        </div>
        <ul className="menu">
          <li
            className={activeSection === 'Dashboard' ? 'active' : ''}
            onClick={() => handleSectionChange('Dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeSection === 'PaymentHistory' ? 'active' : ''}
            onClick={() => handleSectionChange('PaymentHistory')}
          >
            Payment History
          </li>
          <li
            className={activeSection === 'Insurance' ? 'active' : ''}
            onClick={() => handleSectionChange('Insurance')}
          >
            Insurance
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
        {renderContent()}
      </div>
    </div>
  );
}

export default UserDashboard;

