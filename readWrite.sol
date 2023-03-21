//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract RemixContract {
    string message;

    constructor()  {
        message = "Hello Nikhil";
    }

    function getMessage() public view returns(string memory) {
        return message;
    }

    function setMessage(string memory _message) public {
        message = _message;
    }

    function defaultMessage() public pure returns(uint256 num, string memory str){
        return (999, "This is RemixContract Default Message");
    }
}

