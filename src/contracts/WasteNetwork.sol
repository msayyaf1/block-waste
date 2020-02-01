pragma solidity ^0.5.0;

contract WasteNetwork {
    string public name;
    mapping(uint => Post) public posts;  //key value store that enables torage of data into the blockchain
    //'posts' is the mapping
    struct Post {
        uint id;
        string content; //General content of type of waster
        string location; //Location info
        address payable poster; //address of person who created the post
        worker: address(0); // address of the person who claims that specific post -- null default
    }

    constructor() public {
        name = "Waste Manager Network";
    }
     
    function createPost (string memory _content) public {



}