pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract Election  {
    struct Candidate {
        uint candidate_id;
        string first_name;
        string last_name;
        string ssn;
        uint voteCount;
        string username;
        string password;
    }
    
    struct ElectionResult  {
        uint candidate_id;
        string first_name;
        string last_name; 
        uint voteCount;
    }

    mapping(uint  => Candidate) public candidates;
    // Store VoteArs Count
    uint public count;
    
    constructor() public {
        addCandidate("Tulsi","Gabbard","","tulsi","tulsi@123");
        addCandidate("Donald","Trump","","donald","trump@123");
        addCandidate("Hillary","Clinton","","hillary","clinton@123");   
    }
    
    function addCandidate(string memory _first_name,string memory _last_name,string memory _ssn,string memory _username,string memory _password) public{
        Candidate memory candidate = Candidate(count,_first_name,_last_name,_ssn,0,_username,_password);
        candidates[count] = candidate;
        count++;
    }
    
    function vote (uint _candidateId) public {
        // update candidate vote Count
        candidates[_candidateId].voteCount++;

        // trigger voted event
        //emit votedEvent(_candidateId);
    }


    function getCandidates() public view returns (Candidate[] memory){
      Candidate[] memory candidateList = new Candidate[](count);
      for (uint i = 0; i < count; i++) {
          candidateList[i] = candidates[i];
      }
      return candidateList;
    }
    
    function getElectionResult() public view returns (ElectionResult[] memory) {
        ElectionResult [] memory result = new ElectionResult[](count);
        for(uint  i =0; i < count; i++){
            result[i] = ElectionResult(candidates[i].candidate_id,candidates[i].first_name,candidates[i].last_name,candidates[i].voteCount);
        }
        return result;
    }
}