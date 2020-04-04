
import React,{Component} from 'react';
import * as constants from '../constants/AppConstants';
import VoterContract from '../contracts/VoterContract.json';


class VoterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            voters: [],
            contract: null,
        }
        this.loadContract = this.loadContract.bind(this);
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = constants.WEB3;
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = VoterContract.networks[networkId];
          
          const electionInstance = new web3.eth.Contract(
              VoterContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, contract: electionInstance });
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
        const { contract } = this.state;
        console.log("Loading Election Contract");
        //this.watchEvents();
        contract.methods.getVoterList().call()
            .then(f => {
                this.setState({ voters: f});
            }).catch(e => {
             console.log(e);
           });
      }

      render(){
        return (
            <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Has Voted</th>
              </tr>
            </thead>
            <tbody >
              {this.state.voters.map((voter) => {
                 let hasVoted = voter.voted ? "Yes" : "No";
                let full_name = voter.first_name +  " " + voter.last_name;
                return(
                  <tr key={voter.user_id}>
                    <th>{voter.user_id}</th>
                    <td>{full_name}</td>
                    <td>{hasVoted}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )
      }
}

export default VoterList;