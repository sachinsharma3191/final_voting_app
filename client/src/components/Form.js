import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

class Form extends React.Component {
  state = {
    classes : null
  }

  useStyles = () => {
    return 
    makeStyles(theme => ({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));
  }

  componentDidMount = async () => {
    const classes = this.useStyles();
     this.setState({
        classes : classes
     })
  };
  render() {
    const classes = this.state;
    return (
      
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Candidate</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          >
          {
            this.props.candidates.map((candidate) => {
                return <MenuItem value={candidate.id}>{candidate.name}</MenuItem>
            })
          }
        </Select>
          <br/>
        <Button className={classes.root} variant="contained" color="primary">Vote</Button>
        </FormControl> 
          
    )
  }
}

export default Form;