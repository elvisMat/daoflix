// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

enum MovieStatus {
    PROPOSED,
    IN_PRODUCTION,
    COMPLETE,
    RELEASED
}
struct Movie {
    uint id;
    string name;
    uint256 budjet;
    MovieStatus movieStatus;
    address proposer;
}

contract MovieDao is Ownable {
    uint256 lockedAmmount;
    uint256 public id = 0;
    mapping(uint256 => Movie) public moviesMapping;

    event BudgetAllocated(uint256 id, uint256 budget, uint lockedAmmount);
    event MoviewProposed(uint256 id, string name);

    function deposit() public payable {}

    function getLogged() public view returns (uint256) {
        return lockedAmmount;
    }

    // new movie proposal
    function NewMovie(string memory _name) public onlyOwner {
        //generate id
        uint256 mid = id++;
        address sender = msg.sender;

        //create a new movie with a budget of 0
        // the next stage would to ask a budget
        Movie memory movie = Movie(mid, _name, 0, MovieStatus.PROPOSED, sender);
        // movies.push(movie);
        moviesMapping[mid] = movie;
        emit MoviewProposed(movie.id, movie.name);
    }

    //allocate budget
    function allocateBudjet(uint256 _id, uint256 _budget) public onlyOwner {
        require((lockedAmmount + _budget) <= address(this).balance / 1e18, "Cannot go over budget");
        lockedAmmount += _budget;
        Movie storage movie = moviesMapping[_id];

        movie.budjet = _budget;
        movie.movieStatus = MovieStatus.IN_PRODUCTION;
        moviesMapping[_id] = movie;
        // address sender = msg.sender;

        emit BudgetAllocated(movie.id, _budget, lockedAmmount);
    }
}
