// UserDashboard.jsx
// import { useState } from "react";
// import useEth from "../../contexts/EthContext/useEth";
// import NoticeNoArtifact from "../ProviderDashboard/NoticeNoArtifact";
// import NoticeWrongNetwork from "../ProviderDashboard/NoticeWrongNetwork";


// const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

// function UserDashboard() {
//   const { state } = useEth();
//   const [formData, setFormData] = useState({
//     area: "",
//     electricityNeeded: "",
//     willingToPay: "",
//     walletAddress: ""
//   });
//   const [providerInfo, setProviderInfo] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const providers = await state.contract.methods
//         .getProvidersByRegion(formData.area)
//         .call();
//       setProviderInfo(providers);
//     } catch (err) {
//       console.error(err);
//       setProviderInfo([]); // No providers found or error occurred
//     }
//   };

//   const UserDashboardContent = (
//     <>
//       <div>
//         <h3>User Information</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Area/Region:
//             <select name="area" value={formData.area} onChange={handleChange}>
//               <option value="">Select Region</option>
//               {regions.map((region, index) => (
//                 <option key={index} value={region}>
//                   {region}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label>
//             Units of Electricity Needed:
//             <input
//               type="number"
//               name="electricityNeeded"
//               value={formData.electricityNeeded}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Willing to Pay Per Unit:
//             <input
//               type="number"
//               name="willingToPay"
//               value={formData.willingToPay}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Wallet Address:
//             <input
//               type="text"
//               name="walletAddress"
//               value={formData.walletAddress}
//               onChange={handleChange}
//             />
//           </label>
//           <button type="submit">Find Providers</button>
//         </form>
//       </div>
//       {providerInfo.length > 0 && (
//         <div>
//           <h3>Provider Information</h3>
//           {providerInfo.map((provider, index) => (
//             <div key={index}>
//               <p>Name: {provider.name}</p>
//               <p>Business Name: {provider.businessName}</p>
//               <p>Area: {provider.area}</p>
//               <p>Available Electricity: {provider.availableElectricity}</p>
//               <p>Selling Price: {provider.sellingPrice}</p>
//               <p>Physical Address: {provider.physicalAddress}</p>
//               <p>Wallet Address: {provider.walletAddress}</p>
//               <p>Perks: {provider.perks}</p>
//               <hr />
//             </div>
//           ))}
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




// import React, { useState } from 'react';
// import useEth from '../../contexts/EthContext/useEth';
// import NoticeNoArtifact from '../ProviderDashboard/NoticeNoArtifact';
// import NoticeWrongNetwork from '../ProviderDashboard/NoticeWrongNetwork';
// import './UserDash.css';

// const regions = ["Region1", "Region2", "Region3"]; // Add more regions as needed

// function UserDashboard() {
//   const { state } = useEth();
//   const [formData, setFormData] = useState({
//     area: '',
//     electricityNeeded: '',
//     willingToPay: '',
//     walletAddress: ''
//   });
//   const [providerInfo, setProviderInfo] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
//   const [recentActivity, setRecentActivity] = useState([
//     "Search 1: Region1, 100 units",
//     "Search 2: Region2, 50 units",
//     "Search 3: Region3, 200 units"
//   ]); // Add dummy recent activity items

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const providers = await state.contract.methods
//         .getProvidersByRegion(formData.area)
//         .call();
//       setProviderInfo(providers);
//       setRecentActivity([...recentActivity, `Search: ${formData.area}, ${formData.electricityNeeded} units`]);
//     } catch (err) {
//       console.error(err);
//       setProviderInfo([]); // No providers found or error occurred
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const UserDashboardContent = (
//     <>
//       <div className="form-section">
//         <h3>User Information</h3>
        // <form onSubmit={handleSubmit}>
        //   <label>
        //     Area/Region:
        //     <select name="area" value={formData.area} onChange={handleChange}>
        //       <option value="">Select Region</option>
        //       {regions.map((region, index) => (
        //         <option key={index} value={region}>
        //           {region}
        //         </option>
        //       ))}
        //     </select>
        //   </label>
        //   <label>
        //     Units of Electricity Needed:
        //     <input
        //       type="number"
        //       name="electricityNeeded"
        //       value={formData.electricityNeeded}
        //       onChange={handleChange}
        //     />
        //   </label>
        //   <label>
        //     Willing to Pay Per Unit:
        //     <input
        //       type="number"
        //       name="willingToPay"
        //       value={formData.willingToPay}
        //       onChange={handleChange}
        //     />
        //   </label>
        //   <label>
        //     Wallet Address:
        //     <input
        //       type="text"
        //       name="walletAddress"
        //       value={formData.walletAddress}
        //       onChange={handleChange}
        //     />
        //   </label>
        //   <button type="submit">Find Providers</button>
        // </form>
//       </div>
//       {providerInfo.length > 0 && (
//         <div className="provider-info">
//           <h3>Provider Information</h3>
//           {providerInfo.map((provider, index) => (
//             <div key={index} className="provider-card">
//               <p>Name: {provider.name}</p>
//               <p>Business Name: {provider.businessName}</p>
//               <p>Area: {provider.area}</p>
//               <p>Available Electricity: {provider.availableElectricity}</p>
//               <p>Selling Price: {provider.sellingPrice}</p>
//               <p>Physical Address: {provider.physicalAddress}</p>
//               <p>Wallet Address: {provider.walletAddress}</p>
//               <p>Perks: {provider.perks}</p>
//               <hr />
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="recent-activity">
//         <h3>Recent Activity</h3>
//         <ul>
//           {recentActivity.map((activity, index) => (
//             <li key={index}>{activity}</li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );

//   return (
//     <div className={`UserDashboard ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="sidebar">
//         <div className="user-info">
//           <h4>Hi User !</h4>
//         </div>
//         <ul>
//           <li>Dashboard</li>
//           <li>Payment</li>
//           <li>Support</li>
//         </ul>
//         <div className="bottom-options">
//           <button onClick={toggleDarkMode}>
//             Dark Mode: {darkMode ? 'On' : 'Off'}
//           </button>
//           <button>Logout</button>
//         </div>
//       </div>
//       <div className="content">
//         {!state.artifact ? (
//           <NoticeNoArtifact />
//         ) : !state.contract ? (
//           <NoticeWrongNetwork />
//         ) : (
//           UserDashboardContent
//         )}
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;





// import React, { useState } from 'react';
// import useEth from '../../contexts/EthContext/useEth';
// import NoticeNoArtifact from '../ProviderDashboard/NoticeNoArtifact';
// import NoticeWrongNetwork from '../ProviderDashboard/NoticeWrongNetwork';
// import './UserDash.css';

// const regions = ["Behala ", "Newton", "Dumdum", "Ruby", "Park Circus", "Rashbehari", "Tollygunge"]; // Add more regions as needed

// function UserDashboard() {
//   const { state } = useEth();
//   const [formData, setFormData] = useState({
//     area: '',
//     electricityNeeded: '',
//     willingToPay: '',
//     walletAddress: ''
//   });
//   const [providerInfo, setProviderInfo] = useState([]);
//   const [providerIndex, setProviderIndex] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);
  
//   const [selectedOption, setSelectedOption] = useState('Dashboard');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await state.contract.methods
//       .getProviderWithLeastSellingPrice(formData.area, parseInt(formData.electricityNeeded))
//       .call();
//     setProviderInfo(result[0]);
//     setProviderIndex(result[1]); 
     
      
//     } catch (err) {
//       console.error(err);
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


//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//   };

//   const UserDashboardContent = () => {
//     switch (selectedOption) {
//       case 'Dashboard':
//         return (
//           <div className="form-section card">
//             <h3>Enter Information</h3>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Area/Region: 
//                 <select name="area" value={formData.area} onChange={handleChange}>
//                   <option value="">Select Region</option>
//                   {regions.map((region, index) => (
//                     <option key={index} value={region}>
//                       {region}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <label>
//                 Units of Electricity Needed:  
//                 <input
//                   type="number"
//                   name="electricityNeeded"
//                   value={formData.electricityNeeded}
//                   onChange={handleChange}
//                   required />
//               </label>
//               <label>
//                 Willing to Pay Per Unit: 
//                 <input
//                   type="number"
//                   name="willingToPay"
//                   value={formData.willingToPay}
//                   onChange={handleChange} required
//                 />
//               </label>
//               <label>
//                 Wallet Address:  
//                 <input
//                   type="text"
//                   name="walletAddress"
//                   value={formData.walletAddress}
//                   onChange={handleChange} required
//                 />
//               </label>
//               <button type="submit">Find Providers</button>
//             </form>
//           </div>
//         );
//       case 'Payment':
//         return (
//           <div className="payment-section card">
//             <h3>Payment Options</h3>
//             {/* List of payment options */}
//             <ul>
//               <li>Payment Mode 1</li>
//               <li>Payment Mode 2</li>
//               <li>Payment Mode 3</li>
//             </ul>
//             <h3>Transaction History</h3>
//             <ul>
//               <li>Transaction 1</li>
//               <li>Transaction 2</li>
//               <li>Transaction 3</li>
//             </ul>
//           </div>
//         );
//         case 'Insurance':
//           return (
//             <div className="payment-section card">
//               <h3>Payment Options</h3>
//               {/* List of payment options */}
//               <ul>
//                 <li>Payment Mode 1</li>
//                 <li>Payment Mode 2</li>
//                 <li>Payment Mode 3</li>
//               </ul>
//               <h3>Transaction History</h3>
//               <ul>
//                 <li>Transaction 1</li>
//                 <li>Transaction 2</li>
//                 <li>Transaction 3</li>
//               </ul>
//             </div>
//           );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className={`UserDashboard ${darkMode ? 'dark-mode' : ''}`}>
//       <div className="sidebar">
//         <div className="user-info">
//           <h4>Hi Consumer ! </h4>
//         </div>
//         <ul className="menu">
//           <li
//             className={selectedOption === 'Dashboard' ? 'active' : ''}
//             onClick={() => handleOptionClick('Dashboard')}
//           >
//             Dashboard
//           </li>
//           <li
//             className={selectedOption === 'Payment' ? 'active' : ''}
//             onClick={() => handleOptionClick('Payment')}
//           >
//             Payment
//           </li>
//           <li
//              className={selectedOption === 'Insurance' ? 'active' : ''}
//              onClick={() => handleOptionClick('Insurance')}
//           >Insurance</li>
//         </ul>
        
//         <div className="bottom-options">
//           <button className="d-button" onClick={toggleDarkMode}>
//             Dark Mode: {darkMode ? 'On' : 'Off'}
//           </button>
//           <button className="d-button" >Logout</button>
//         </div>

//       </div>
//       <div className="content">
//         {!state.artifact ? (
//           <NoticeNoArtifact />
//         ) : !state.contract ? (
//           <NoticeWrongNetwork />
//         ) : (
//           <>
//           {UserDashboardContent()}
//           {selectedOption === 'Dashboard' && providerInfo && (
//             <div className="provider-info">
            
//             <div className="provider-card">
//             <h3>Provider Information</h3>
//               <p><strong>Name:</strong> {providerInfo.name}</p>
//               <p><strong>Business Name:</strong> {providerInfo.businessName}</p>
//               <p><strong>Area:</strong> {providerInfo.area}</p>
//               <p><strong>Available Electricity:</strong> {providerInfo.availableElectricity}</p>
//               <p><strong>Selling Price:</strong> {providerInfo.sellingPrice}</p>
//               <p><strong>Physical Address:</strong> {providerInfo.physicalAddress}</p>
//               <p><strong>Wallet Address:</strong> {providerInfo.walletAddress}</p>
//               <p><strong>Perks:</strong> {providerInfo.perks}</p>
//               <button onClick={handleChargeRequest}>Charge Request</button>
//             </div>
//           </div>
//         )}
//         </>
//         )}
//       </div>
//     </div>
//   );

// }

// export default UserDashboard;






import React, { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import NoticeNoArtifact from '../ProviderDashboard/NoticeNoArtifact';
import NoticeWrongNetwork from '../ProviderDashboard/NoticeWrongNetwork';
import './UserDash.css';

const regions = ["Behala ", "Newton", "Dumdum", "Ruby", "Park Circus", "Rashbehari", "Tollygunge"]; // Add more regions as needed

function UserDashboard() {
  const { state } = useEth();
  const [formData, setFormData] = useState({
    area: '',
    electricityNeeded: '',
    willingToPay: '',
    walletAddress: ''
  });
  const [providerInfo, setProviderInfo] = useState(null);
  const [providerIndex, setProviderIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [selectedOption, setSelectedOption] = useState('Dashboard');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await state.contract.methods
        .getProviderWithLeastSellingPrice(formData.area, parseInt(formData.electricityNeeded))
        .call();
      setProviderInfo(result[0]);
      setProviderIndex(result[1]);
    } catch (err) {
      console.error(err);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const UserDashboardContent = () => {
    switch (selectedOption) {
      case 'Dashboard':
        return (
          <div className="form-section card">
            <h3>Enter Information</h3>
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
                  required />
              </label>
              <label>
                Willing to Pay Per Unit: 
                <input
                  type="number"
                  name="willingToPay"
                  value={formData.willingToPay}
                  onChange={handleChange} required
                />
              </label>
              <label>
                Wallet Address:  
                <input
                  type="text"
                  name="walletAddress"
                  value={formData.walletAddress}
                  onChange={handleChange} required
                />
              </label>
              <button type="submit">Find Providers</button>
            </form>
          </div>
        );
      case 'Payment':
        return (
          <div className="payment-section card">
            <h3>Payment Options</h3>
            {/* List of payment options */}
            <ul>
              <li>Payment Mode 1</li>
              <li>Payment Mode 2</li>
              <li>Payment Mode 3</li>
            </ul>
            <h3>Transaction History</h3>
            <ul>
              <li>Transaction 1</li>
              <li>Transaction 2</li>
              <li>Transaction 3</li>
            </ul>
          </div>
        );
      case 'Insurance':
        return (
          <div className="payment-section card">
            <h3>Insurance Options</h3>
            {/* List of insurance options */}
            <ul>
              <li>Insurance Plan 1</li>
              <li>Insurance Plan 2</li>
              <li>Insurance Plan 3</li>
            </ul>
            <h3>Claim History</h3>
            <ul>
              <li>Claim 1</li>
              <li>Claim 2</li>
              <li>Claim 3</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`UserDashboard ${darkMode ? 'dark-mode' : ''}`}>
      <div className="sidebar">
        <div className="user-info">
          <h4>Hi Consumer ! </h4>
        </div>
        <ul className="menu">
          <li
            className={selectedOption === 'Dashboard' ? 'active' : ''}
            onClick={() => handleOptionClick('Dashboard')}
          >
            Dashboard
          </li>
          <li
            className={selectedOption === 'Payment' ? 'active' : ''}
            onClick={() => handleOptionClick('Payment')}
          >
            Payment
          </li>
          <li
            className={selectedOption === 'Insurance' ? 'active' : ''}
            onClick={() => handleOptionClick('Insurance')}
          >
            Insurance
          </li>
        </ul>
        <div className="bottom-options">
          <button onClick={toggleDarkMode}>
            Dark Mode: {darkMode ? 'On' : 'Off'}
          </button>
          <button>Logout</button>
        </div>
      </div>
      <div className="content">
        {!state.artifact ? (
          <NoticeNoArtifact />
        ) : !state.contract ? (
          <NoticeWrongNetwork />
        ) : (
          <>
            {UserDashboardContent()}
            {selectedOption === 'Dashboard' && providerInfo && (
              <div className="provider-info">
                <h3>Provider Information</h3>
                <div className="provider-card">
                  <p><strong>Name:</strong> {providerInfo.name}</p>
                  <p><strong>Business Name:</strong> {providerInfo.businessName}</p>
                  <p><strong>Area:</strong> {providerInfo.area}</p>
                  <p><strong>Available Electricity:</strong> {providerInfo.availableElectricity}</p>
                  <p><strong>Selling Price:</strong> {providerInfo.sellingPrice}</p>
                  <p><strong>Physical Address:</strong> {providerInfo.physicalAddress}</p>
                  <p><strong>Wallet Address:</strong> {providerInfo.walletAddress}</p>
                  <p><strong>Perks:</strong> {providerInfo.perks}</p>
                  <button onClick={handleChargeRequest}>Charge Request</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;






