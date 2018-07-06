import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from './Styles';

const SnackBarSubmission = props => {
const {classes} = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={props.snackBarSubmission || props.snackBarSubmissionError}
      autoHideDuration={3000}
      onClose={()=>props.handleCloseSnackBar(props.snackBarSubmission?'submission':'errSubmission')}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.snackBarSubmission? 'Feedback Received' : 'Form contains errors'}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={()=>props.handleCloseSnackBar(props.snackBarSubmission?'submission':'errSubmission')}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

SnackBarSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
  snackBarSubmission: PropTypes.bool.isRequired,
  snackBarSubmissionError: PropTypes.bool.isRequired,
  handleCloseSnackBar: PropTypes.func.isRequired
}

export default withStyles(styles)(SnackBarSubmission);
