import React from 'react'

class Table extends React.Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              <tr>
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

export default Table