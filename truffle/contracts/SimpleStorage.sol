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
    }

    Provider[] providers;

    function addProvider(
        string memory _name,
        string memory _businessName,
        string memory _area,
        uint256 _availableElectricity,
        uint256 _sellingPrice,
        string memory _physicalAddress,
        string memory _walletAddress
    ) public {
        Provider memory newProvider = Provider({
            name: _name,
            businessName: _businessName,
            area: _area,
            availableElectricity: _availableElectricity,
            sellingPrice: _sellingPrice,
            physicalAddress: _physicalAddress,
            walletAddress: _walletAddress
        });
        providers.push(newProvider);
    }

    function getProvidersCount() public view returns (uint256) {
        return providers.length;
    }

    function getProvider(uint256 index) public view returns (Provider memory) {
        require(index < providers.length, "Provider index out of bounds");
        return providers[index];
    }
    
}
