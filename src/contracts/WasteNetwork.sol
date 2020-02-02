pragma solidity ^0.5.0;

contract WasteNetwork {
    string public name;
    uint public postCount = 0; //To count the number of posts
    mapping(uint => Post) public posts;  //key value store that enables torage of data into the blockchain
    //'posts' is the mapping
    
    struct Post {
        uint id;
        string content; //General content of type of waster
        address payable poster; //address of person who created the post
        address payable worker; // address of the person who claims that specific post -- null default
        uint payamt;
    }
    event PostCreated(
        uint id,
        string content,
        address payable poster,
        address payable worker,
        uint payamt
    );

    event ClaimThePost(
        uint id,
        string content,
        address poster,
        address worker,
        uint payamt
    );

    event Collecting(
        uint id,
        string content,
        address poster,
        address payable worker,
        uint payamt
    );

    constructor() public {
        name = "Waste Manager Network";
    }
     
    function createPost (string memory _content) public {
        // Require that post be non empty
        require(bytes(_content).length > 0);
        postCount ++; //Incrementing the post count
        // Create the post 
        posts[postCount] = Post(postCount, _content, msg.sender,0x0000000000000000000000000000000000000000, 0);
        // Triggering events
        emit PostCreated(postCount, _content, msg.sender,0x0000000000000000000000000000000000000000, 0);

    }
    //Function for claiming a waste listing
    function ClaimPost(uint _id) public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= postCount);
        // Fetching the post and making a copy of to _post
        Post memory _post = posts[_id];
        //fetching the poster address
        address _poster = _post.poster;

        //making sure logged in user not same as poster
        // require(msg.sender!=_post.poster);

        // fetching the worker who is the current loggedin person
        address _worker = _post.worker;
        // get the address of the worker address who claimed the post
        _post.worker = msg.sender;
        

        //updating the post
        posts[_id] = _post;
        // Trigger the event
        emit ClaimThePost(postCount, _post.content, _poster, _worker, _post.payamt);

    }

        //function to verify nad tranfer the amount
      function payCollection(uint _id) public payable {
        // Fetching the post and making a copy of to _post
        Post memory _post = posts[_id];

        //fetching the poster address
        address _poster = _post.poster;

        // Fetch the worker
        address payable _worker = _post.worker;
        // Pay the worker by sending them Ether
        address(_worker).transfer(msg.value);
        // Increment the tip amount
        _post.payamt = _post.payamt + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit Collecting(postCount, _post.content, _poster, _worker, _post.payamt);
    }





}