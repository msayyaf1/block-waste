pragma solidity ^0.5.0;

contract WasteNetwork {
    string public name;
    uint public postCount = 0; //To count the number of posts
    mapping(uint => Post) public posts;  //key value store that enables torage of data into the blockchain
    //'posts' is the mapping
    struct Post {
        uint id;
        string content; //General content of type of waster
        string location; //Location info
        address payable poster; //address of person who created the post
        worker: address(0); // address of the person who claims that specific post -- null default
    }
    event PostCreated(
        uint id,
        string content,
        string location,
        address payable poster,
        worker: address(0)
    );


    constructor() public {
        name = "Waste Manager Network";
    }
     
    function createPost (string memory _content) public {
        // Require that post be non empty
        require(bytes(_content).length > 0);
        postCount ++; //Incrementing the post count
        // Create the post 
        posts[postCount] = Post(postCount, _content, _location, msg.sender);
        // Triggering events
        emit PostCreated(postCount, _content, _location , msg.sender);

    }
    
}