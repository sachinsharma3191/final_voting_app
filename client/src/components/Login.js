import React,{ Component } from "react";
import * as constants from '../constants/AppConstants';
import Web3 from 'web3';
import VoterRegistrationContract from '../contracts/VoterContract.json';



class Login extends Component {
    constructor(props){
        super(props);
        
        this.state = {
          web3: null,
          accounts: null,
          contract: null,
          account: null,
            username : '',
            password: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = constants.WEB3;
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = VoterRegistrationContract.networks[networkId];
          
          const electionInstance = new web3.eth.Contract(
              VoterRegistrationContract.abi,
              deployedNetwork && deployedNetwork.address,
          );
          
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({  
            web3,
            accounts,
            contract: electionInstance,
            account: accounts[0]
          });


        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

      handleInputChange(event){
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name] : val});

       this.state.contract.methods.getVoterList().call().then(f => {
        console.log(f);
       }).catch(e => {
         console.log(e);
       });
    }   

    login(){
        const {account,contract,username,password} = this.state;
        contract.methods.login(username,password)
        .call({
          from: account,
          gasPrice: Web3.utils.asciiToHex("0.0001"),
          gas: 6721975,
       }).then((f) => {
          console.log(f);
          alert(f === true ? "User Login Successful" : " Invalid Login Credentials");
      }).catch(e => {
          console.log(e);
          alert(e);
      }); 
    }
    
    render(){
        return(
            <div>
            <form>
                 <p>Enter username:</p>
            <input
              type='text'
              name='username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <p>Enter password:</p>
            <input
              type='password'
              name='password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            </form>
            <button 
                type = "submit" 
                onClick = {this.login}> 
              Login
              </button>
            </div>
        );
    }
}

export default Login;