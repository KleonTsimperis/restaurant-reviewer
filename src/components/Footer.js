import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  footer:{
    position:'fixed',
    bottom:0,
    right:0,
    maxHeight:'35px',
    height:'25px',
    backgroundColor:'grey',
    width:'100%',
    color:'white',
    textAlign:'center'
  }
}


const Footer = props => {
  const {classes} = props;
  return <footer className={classes.footer}><h3>Footer</h3>

         </footer>
}
export default withStyles(styles)(Footer);
