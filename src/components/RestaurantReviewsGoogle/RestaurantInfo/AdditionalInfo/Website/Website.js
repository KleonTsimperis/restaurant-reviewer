import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Public from '@material-ui/icons/Public';
import styles from '../../../Styles';

const Website = props => {
  const {classes} = props;
  if(props.website){
    return(
      <div className="row set" >
        <div className="col-11 offset-1 " >
          <a href={props.website} className={classes.url}><Public className={classes.icon}/> {props.website}</a>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default withStyles(styles)(Website);
