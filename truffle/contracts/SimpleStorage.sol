// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    struct Provider {
        string name;
        string businessName;
        string area;
        uint256 availableElectricity;
        uint256 sellingPrice;
        string physicalAddress;
        string walletAddress;
        string perks;
    }

    Provider[] providers;

    function addProvider(
        string memory _name,
        string memory _businessName,
        string memory _area,
        uint256 _availableElectricity,
        uint256 _sellingPrice,
        string memory _physicalAddress,
        string memory _walletAddress,
        string memory _perks
    ) public {
        Provider memory newProvider = Provider({
            name: _name,
            businessName: _businessName,
            area: _area,
            availableElectricity: _availableElectricity,
            sellingPrice: _sellingPrice,
            physicalAddress: _physicalAddress,
            walletAddress: _walletAddress,
            perks:_perks
        });
        providers.push(newProvider);
    }
    
     function getCurrentCharge(uint _index) public view returns (uint) {
        return providers[_index].availableElectricity;
    }

    function getProvidersCount() public view returns (uint256) {
        return providers.length;
    }

    function getProvider(uint256 index) public view returns (Provider memory) {
        require(index < providers.length, "Provider index out of bounds");
        return providers[index];
    }

    // Function to get all providers in the specified region
    function getProvidersByRegion(string memory _area) public view returns (Provider[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < providers.length; i++) {
            if (keccak256(abi.encodePacked(providers[i].area)) == keccak256(abi.encodePacked(_area))) {
                count++;
            }
        }

        Provider[] memory result = new Provider[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < providers.length; i++) {
            if (keccak256(abi.encodePacked(providers[i].area)) == keccak256(abi.encodePacked(_area))) {
                result[index] = providers[i];
                index++;
            }
        }
        return result;
    }
}
