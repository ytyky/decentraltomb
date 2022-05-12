// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tomb {

    struct Moral {
        uint id;
        string name;
        uint RIPCount;
        string died;
    }

    mapping(uint => Moral) public morals;

    // Store death Count
    uint public moralsCount;

    //Constructor
    constructor () {
        addmorals("Christian Hyugens", "July 8, 1695");
        addmorals("Isaac, Newton", "march 31, 1727");
    }

    function addmorals (string memory _name, string memory _passday) public {
        moralsCount ++;
        morals[moralsCount] = Moral(moralsCount, _name, 0, _passday);
    }

    function payRespect (uint _id) public {

        // restrict pay respect only to existed tomb
        require(_id >= 1 && _id <= moralsCount);

        morals[_id].RIPCount ++;
    }

}