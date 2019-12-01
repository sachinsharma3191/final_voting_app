import React from 'react';
import Results from './Results';
import Form from './Form';

class Content extends React.Component {
  
  render() {
    return (
      <div>
        <hr/>
          <Form 
            candidates={this.props.candidates} 
            castVote={this.props.castVote}
            candidateChange={this.props.candidateChange}
             />
        <p>Your account: {this.props.account}</p>
        <p>Contract Address: <a href="https://rinkeby.etherscan.io/address/0x12123b59e6437e487ce69e59ff5a636b261e8758" target="_blank">0x12123b59e6437e487ce69e59ff5a636b261e8758</a></p>
      </div>
    )
  }
}

export default Content