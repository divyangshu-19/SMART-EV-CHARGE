// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    struct Provider {
        string name;
        string businessName;
        string area;
        uint256 availableElectricity;
        uint256 sellingPrice;
        string chargingSpeed;
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
    mapping(uint => UserRequest[]) public userRequests;

    function addProvider(
        string memory _name,
        string memory _businessName,
        string memory _area,
        uint256 _availableElectricity,
        uint256 _sellingPrice,
        string memory _chargingSpeed,
        string memory _physicalAddress,
        string memory _perks
    ) public {
        Provider memory newProvider = Provider({
            name: _name,
            businessName: _businessName,
            area: _area,
            availableElectricity: _availableElectricity,
            sellingPrice: _sellingPrice,
            chargingSpeed: _chargingSpeed,
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

    function getProviderWithLeastSellingPrice(
        string memory _area,
        uint256 _electricityNeeded,
        uint256 askingPrice,
        string memory _chargingSpeed
    ) public view returns (Provider memory, uint) {
        uint closestMatchingIndex = providers.length;
        uint lowestPriceDifference = type(uint).max;

        for (uint256 i = 0; i < providers.length; i++) {
            if (
                keccak256(abi.encodePacked(providers[i].area)) == keccak256(abi.encodePacked(_area)) &&
                providers[i].availableElectricity >= _electricityNeeded &&
                providers[i].sellingPrice <= askingPrice &&
                keccak256(abi.encodePacked(providers[i].chargingSpeed)) == keccak256(abi.encodePacked(_chargingSpeed))
            ) {
                uint priceDifference = askingPrice - providers[i].sellingPrice;
                if (priceDifference < lowestPriceDifference) {
                    lowestPriceDifference = priceDifference;
                    closestMatchingIndex = i;
                }
            }
        }
        require(
            closestMatchingIndex < providers.length,
            "No suitable providers found in this area"
        );
        return (providers[closestMatchingIndex], closestMatchingIndex);
    }

    function transferEther(
        uint _index,
        string memory _evModel,
        uint256 _electricityNeeded,
        uint256 _amountPaid,
        address payable _to,
        uint _amount
    ) public payable {
        require(_index < providers.length, "Provider index out of bounds");
        require(providers[_index].availableElectricity >= _electricityNeeded, "Not enough available electricity");
        providers[_index].availableElectricity -= _electricityNeeded;
        providerStatus[_index] = "Charge requested";
        userRequests[_index].push(UserRequest({
            evModel: _evModel,
            electricityNeeded: _electricityNeeded,
            amountPaid: _amountPaid
        }));
        require(address(this).balance >= _amount, "Insufficient balance in contract");
        _to.transfer(_amount);
    }

    function getProviderStatusByAddress() public view returns (Provider memory, string memory, UserRequest[] memory) {
        uint providerIndex = providers.length;
        for (uint i = 0; i < providers.length; i++) {
            if (providers[i].walletAddress == msg.sender) {
                providerIndex = i;
                break;
            }
        }
        require(providerIndex < providers.length, "Provider not found");

        return (providers[providerIndex], providerStatus[providerIndex], userRequests[providerIndex]);
    }

    // function transferEther(address payable _to, uint _amount) public payable {
    //     require(address(this).balance >= _amount, "Insufficient balance in contract");
    //     _to.transfer(_amount);
    // }
    // function requestCharge(uint _index, string memory _evModel, uint256 _electricityNeeded, uint256 _amountPaid) public {
    //     require(_index < providers.length, "Provider index out of bounds");
    //     require(providers[_index].availableElectricity >= _electricityNeeded, "Not enough available electricity");
    //     providers[_index].availableElectricity -= _electricityNeeded;
    //     providerStatus[_index] = "Charge requested";
    //     userRequests[_index] = UserRequest({
    //         evModel: _evModel,
    //         electricityNeeded: _electricityNeeded,
    //         amountPaid: _amountPaid
    //     });
    // }
}