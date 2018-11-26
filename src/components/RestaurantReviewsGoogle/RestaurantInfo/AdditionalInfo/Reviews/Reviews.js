import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../Styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RateReview from '@material-ui/icons/RateReview';
import Review from './Review/Review';

const Reviews = props => {
  const {classes} = props;
    return(
      <div className="row">
        <div className="col-11 offset-1">
          <Typography component="div" className={classes.info}>
            <ExpansionPanel className={classes.expPanel}>
              <ExpansionPanelSummary style={{padding:0}} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.info}><RateReview className={classes.icon}/><span className={classes.rr}>Recent Reviews</span></Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography component="div">
                  {props.reviews.map(review =>
                    <Review
                      key={review.text}
                      author_name={review.author_name}
                      rating={review.rating}
                      text={review.text}
                    />
                  )}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Typography>
        </div>
      </div>
    );
}

export default withStyles(styles)(Reviews);
