import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../Styles';
import Phone from '@material-ui/icons/Phone';

const PhoneNumber = props => {
  const {classes} = props;
  if(props.formatted_phone_number){
    return(
      <div className="row set">
        <div className="col-11 offset-1 ">
          <span className="set"><Phone className={classes.icon}/> {props.formatted_phone_number}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}


export default withStyles(styles)(PhoneNumber);
