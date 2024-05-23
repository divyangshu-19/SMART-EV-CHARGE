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
        address walletAddress;
        string perks;
    }

    Provider[] providers;
    mapping(uint => string) public providerStatus;

    function addProvider(
        string memory _name,
        string memory _businessName,
        string memory _area,
        uint256 _availableElectricity,
        uint256 _sellingPrice,
        string memory _physicalAddress,
        string memory _perks
    ) public {
        Provider memory newProvider = Provider({
            name: _name,
            businessName: _businessName,
            area: _area,
            availableElectricity: _availableElectricity,
            sellingPrice: _sellingPrice,
            physicalAddress: _physicalAddress,
            walletAddress: msg.sender,
            perks: _perks
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

    function getProviderWithLeastSellingPrice(string memory _area) public view returns (Provider memory, uint) {
        uint lowestPriceIndex = providers.length;
        uint lowestPrice = type(uint).max;

        for (uint256 i = 0; i < providers.length; i++) {
            if (keccak256(abi.encodePacked(providers[i].area)) == keccak256(abi.encodePacked(_area))) {
                if (providers[i].sellingPrice < lowestPrice) {
                    lowestPrice = providers[i].sellingPrice;
                    lowestPriceIndex = i;
                }
            }
        }

        require(lowestPriceIndex < providers.length, "No providers found in this area");
        return (providers[lowestPriceIndex], lowestPriceIndex);
    }

    function requestCharge(uint _index) public {
        require(_index < providers.length, "Provider index out of bounds");
        providerStatus[_index] = "Charge requested";
    }
}
