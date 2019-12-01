import React from 'react'
import Web3 from 'web3';
import * as constants from '../constants/AppConstants';
import ElectionContract from '../contracts/Election.json';
import * as  constant from '../constants/AppConstants';

class Results extends React.Component {

  constructor(props){
    super(props);
    this.state = {
       web3: null, accounts: null, contract: null,
       candidates: []
    }
    this.loadContract = this.loadContract.bind(this);
  }

  componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = constants.WEB3;
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = ElectionContract.networks[networkId];
          
          const electionInstance = new web3.eth.Contract(
              ElectionContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: electionInstance,account: accounts[0] });
          this.loadContract();
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };


  loadContract = async() => {
    const { accounts, contract } = this.state;
    console.log("Loading Election Contract");
    //this.watchEvents();
    contract.methods.getCandidates().call().then((result,err) => {
      console.log("Loading Candiadates Info");
        if(typeof(err) === undefined){
          alert("No candidates found");
        }
        if(result ){
          let candidates = []
            for(let candidate of result){
              let keys = Object.keys(candidate).filter(key => key === "id" || key === "name" || key ===  "voteCount");
              candidates.push({
                id: candidate[keys[0]],
                name: candidate[keys[1]],
                voteCount: candidate[keys[2]]
              });
            }
            this.setState({ candidates: candidates })
            console.log("Candiates Info Loaded");
            console.log(candidates);
            this.setState({loading : false});
        }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.state.candidates.map((candidate) => {
            return(
              <tr key={candidate.id}>
                <th>{candidate.id}</th>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Results;