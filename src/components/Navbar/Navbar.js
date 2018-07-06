import React from 'react';
import '../Components.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from './Styles'


const Navbar = props => {
  const { classes } = props;
  return(
     <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.containerA}>
          <Typography className={classes.heading1} id="nav-title">Restaurant Reviewer</Typography>
          <Typography className={classes.heading2}>Filter results</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.paddingBottom}>

        <form className={classes.containerB}>
        <FormControl className={classes.formControlA}>
          <InputLabel htmlFor="controlled-open-select">Rating From</InputLabel>
          <Select
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

          <FormControl className={classes.formControlA}>
          <InputLabel htmlFor="controlled-open-select">Rating To</InputLabel>
          <Select
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

        <FormControl className={classes.formControlB}>
        <TextField
          name="searchTerm"
          label="Search By Restaurant Name"
          className={classes.textField}
          margin="normal"
          value={props.searchTerm}
          onChange={props.handleInputChange}
        />
        </FormControl>

        <FormControl className={classes.formControlC}>
          <Button  aria-label="delete" className={classes.formControlC} onClick={props.clearFilters}>
            Clear Filters
          </Button>
        </FormControl>

        </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    )
  };

  Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleInputOpen: PropTypes.func,
    handleInputClose: PropTypes.func,
    handleInputChange: PropTypes.func.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
  }

export default withStyles(styles)(Navbar);
