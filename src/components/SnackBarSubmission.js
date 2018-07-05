import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

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

export default withStyles(styles)(SnackBarSubmission);
