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

    struct UserRequest {
        string evModel;
        uint256 electricityNeeded;
        uint256 amountPaid;
    }

    Provider[] providers;
    mapping(uint => string) public providerStatus;
    mapping(uint => UserRequest) public userRequests;

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

    function getProvidersCount() public view returns (uint256) {
        return providers.length;
    }

    function getProvider(uint256 index) public view returns (Provider memory) {
        require(index < providers.length, "Provider index out of bounds");
        return providers[index];
    }

    function getProviderWithLeastSellingPrice(string memory _area, uint256 _electricityNeeded) public view returns (Provider memory, uint) {
        uint lowestPriceIndex = providers.length;
        uint lowestPrice = type(uint).max;

        for (uint256 i = 0; i < providers.length; i++) {
            if (keccak256(abi.encodePacked(providers[i].area)) == keccak256(abi.encodePacked(_area))) {
                if (providers[i].sellingPrice < lowestPrice && providers[i].availableElectricity >= _electricityNeeded) {
                    lowestPrice = providers[i].sellingPrice;
                    lowestPriceIndex = i;
                }
            }
        }

        require(lowestPriceIndex < providers.length, "No providers found in this area");
        return (providers[lowestPriceIndex], lowestPriceIndex);
    }

    function requestCharge(uint _index, string memory _evModel, uint256 _electricityNeeded, uint256 _amountPaid) public {
        require(_index < providers.length, "Provider index out of bounds");
        require(providers[_index].availableElectricity >= _electricityNeeded, "Not enough available electricity");
        providers[_index].availableElectricity -= _electricityNeeded;
        providerStatus[_index] = "Charge requested";
        userRequests[_index] = UserRequest({
            evModel: _evModel,
            electricityNeeded: _electricityNeeded,
            amountPaid: _amountPaid
        });
    }
}
