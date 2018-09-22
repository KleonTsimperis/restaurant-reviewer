import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../Styles';
import LocationOn from '@material-ui/icons/LocationOn';

const Address = props => {
  const {classes} = props;
  if(props.vicinity){
    return(
      <div className="row set">
        <div className="col-11 offset-1 ">
            <LocationOn className={classes.icon}/>{props.vicinity}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Address);
