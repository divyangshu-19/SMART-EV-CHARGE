// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
  uint256[] values;
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

}
