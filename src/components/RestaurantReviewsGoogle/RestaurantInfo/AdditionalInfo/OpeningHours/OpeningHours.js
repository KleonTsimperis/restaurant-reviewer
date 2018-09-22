import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Block from '@material-ui/icons/Block';
import Done from '@material-ui/icons/Done';
import styles from '../../../Styles';
import AccessTime from '@material-ui/icons/AccessTime';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const OpeningHours = props => {
  const {classes} = props;
  if(props.opening_hours){
    return(
      <Fragment>
      <div className="row set">
        <div className="col-11 offset-1 ">
          {props.opening_hours.open_now? <Done className={classes.icon}/>:<Block className={classes.icon}/>} {props.opening_hours.open_now? "Now Open" : "Now Closed"}
        </div>
      </div>
      <div className="row">
        <div className="col-11 offset-1">
          <Typography component="div" className={classes.info}>
            <ExpansionPanel className={classes.expPanel}>
              <ExpansionPanelSummary style={{padding:0}} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.info}><AccessTime className={classes.icon}/><span className={classes.rr}>Opening Hours</span></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography component="div">
                  {props.opening_hours.weekday_text.map(day=>
                    <div key={day}>
                      {day}
                    </div>
                  )}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Typography>
        </div>
      </div>
      </Fragment>
    );
  } else {
    return null;
  }
}




export default withStyles(styles)(OpeningHours);
