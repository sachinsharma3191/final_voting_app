import React,{Component} from 'react';
import * as constants from '../constants/AppConstants';
import VoterRegistrationContract from '../contracts/VoterRegistration.json';


class VoterRegistration extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            web3: null, contract: null,
            first_name: '',
            last_name: '',
            username : '',
            password: '',
            ssn: '',
        }
        
        this.handleInputChage = this.handleInputChage.bind(this);
        this.loadContract = this.loadContract.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = constants.WEB3;
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = VoterRegistrationContract.networks[networkId];
          
          const electionInstance = new web3.eth.Contract(
              VoterRegistrationContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          console.log(electionInstance);
          
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


    loadContract(){

    }

    handleInputChage(event){
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name] : val});
    }   

    register(){

    }
    
    render(){
        return (
            <div>
            <form>
            <h1>Hello {this.state.username}</h1>
            <p>Enter your First name:</p>
            <input
              type='text'
              name='first_name'
              value={this.state.first_name}
              onChange={this.handleInputChage}
            />
            <p>Enter Last Name:</p>
            <input
              type='text'
              name='last_name'
              value={this.state.last_name}
              onChange={this.handleInputChage}
            />
            <p>Enter username:</p>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChage}
            />
            <p>Enter password:</p>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChage}
            />
            
            <p>Enter Social Security Number</p>
            <input
              type='password'
              name='ssn'
              value={this.state.ssn}
              onChange={this.handleInputChage}
            />
            </form>
            </div>
        );
    }
}

export default VoterRegistration;