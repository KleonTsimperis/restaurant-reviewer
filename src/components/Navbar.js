import React from 'react';
import './Components.css';
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


const styles = theme => ({
  root: {
    width: '100%',
  },
  containerA:{
    display: 'flex',
    borderBottom: '1px solid grey',
  },
  heading1: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
    flex: '1 0 92%',
  },
  heading2: {
    flex: '1 0 8%',
    alignSelf: 'center',
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  containerB: {
    display: 'flex',
    flexWrap: 'wrap',
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  formControlA: {
    margin: theme.spacing.unit,
    minWidth: 60,
    width:60,
    flexBasis: '5%'
  },
  formControlB: {
    flexBasis: '5%',
    marginRight: 'auto'
  },
  formControlC: {
    flexBasis: '5%',
    width: '150px',
    marginRight:'5rem'
  },
  paddingBottom: {
    paddingBottom: '8px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    margin:8
  }
});


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
          label="Search By Restaurant Name"
          className={classes.textField}
          margin="normal"
          value={props.searchTerm}
          onChange={props.handleSearchTerm}
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
    handleSearchTerm: PropTypes.func.isRequired,
  }

export default withStyles(styles)(Navbar);
