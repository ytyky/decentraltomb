pragma solidity >=0.4.22 <0.8.0;

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
    constructor () public {
        addmorals("Christian Hyugens", "July 8, 1695");
        addmorals("Isaac, Newton", "march 31, 1727");
    }

    function addmorals (string _name, string _passday) private {
        moralsCount ++;
        morals[moralsCount] = Moral(moralsCount, _name, 0, _passday);
    }

}