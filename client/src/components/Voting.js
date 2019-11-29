import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import * as constants from '../constants/AppConstants';
import contract from 'truffle-contract';
import ElectionContract from '../contracts/Election.json';
import Content from './Content';

class Voting extends Component{
    state = { 
        web3: null,
        accounts: null, 
        contract: null,
        account: null,
        candidates: [],
        loading: true,
        voting: false,
     };
    
    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = this.props.web3;
    
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

      loadContract  = () => {
        const { accounts, contract } = this.state;
        console.log("Loading Election Contract");
        //this.watchEvents();
        contract.methods.getCandidates().call().then((result,err) => {
          console.log("Loading Candiadates Info");
            if(typeof(err) === undefined){
              alert("No candidates found")
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
                this.setState({loading : false});
            }
        }).catch(err => {
          console.log(err);
        });
        
      }

      watchEvents = async() => {
        const { accounts, contract } = this.state;
        contract.votedEvent.call({}, {
            fromBlock: 0,
            toBlock: 'latest'
          }).watch((error, event) => {
            this.setState({ voting: false })
          })
      }

      castVote(candidateId) {
        this.setState({ voting: true })

      }
      render(){
        let candidates = null;
        if(! this.state.loading){
          candidates = this.state.candidates;
        }
        console.log(candidates);
          return (
            <div class='row'>
            <div class='col-lg-12 text-center' >
              <h1>Election Voting</h1>
              <br/>
              { this.state.loading || this.state.voting
                ? <p class='text-center'>Loading...</p>
                : <Content
                    account={this.state.account}
                    candidates={this.state.candidates}
                    hasVoted={this.state.hasVoted}
                    castVote={this.castVote} />
              }
            </div>
          </div>
          )
      }

} 

export default Voting;