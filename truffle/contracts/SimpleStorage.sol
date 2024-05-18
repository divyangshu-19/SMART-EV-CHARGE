// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  uint256[] values;

  struct Provider {
        string name;
        uint256 availableElectricity;
        uint256 sellingPrice;
        string providerAddress;
        string walletAddress;
    }
    
    Provider[] providers;

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }

    // New function to read the array
    function getValues() public view returns (uint256[] memory) {
        return values;
    }

    // New function to push a new element to the array
    function pushValue(uint256 newValue) public {
        values.push(newValue);
    }

 // New function to add a new provider to the array of structs
    function addProvider(
        string memory _name,
        uint256 _availableElectricity,
        uint256 _sellingPrice,
        string memory _providerAddress,
        string memory _walletAddress
    ) public {
        Provider memory newProvider = Provider({
            name: _name,
            availableElectricity: _availableElectricity,
            sellingPrice: _sellingPrice,
            providerAddress: _providerAddress,
            walletAddress: _walletAddress
        });
        providers.push(newProvider);
    }

    // New function to read the array of provider structs
    function getProvidersCount() public view returns (uint256) {
        return providers.length;
    }

    // New function to get details of a specific provider by index
    function getProvider(uint256 index) public view returns (Provider memory) {
        require(index < providers.length, "Provider index out of bounds");
        return providers[index];
    }

  


}
