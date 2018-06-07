import React from 'react';
import './Components.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 140
  },
  navTitle:{
    marginTop: theme.spacing.unit * 2,
  }
});


const Navbar = props =>{
  const { classes } = props;

  return <nav className="navbar m-0 text-center">
          <h1 className={classes.navTitle}>Restaurant Reviewer</h1>
          <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="controlled-open-select">From</InputLabel>
            <Select
              openInput={props.openInput}
              onClose={props.handleInputClose}
              onOpen={props.handleInputOpen}
              value={props.from}
              onChange={props.handleInputChange}
              inputProps={{
                name: 'from',
                id: 'controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="controlled-open-select">To</InputLabel>
            <Select
              openInput={props.openInput}
              onClose={props.handleInputClose}
              onOpen={props.handleInputOpen}
              value={props.to}
              onChange={props.handleInputChange}
              inputProps={{
                name: 'to',
                id: 'controlled-open-select',
              }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>

              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
          </form>
        </nav>;
  }



export default withStyles(styles)(Navbar);
