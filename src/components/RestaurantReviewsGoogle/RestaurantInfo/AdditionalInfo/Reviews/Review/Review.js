import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../../../Styles';
import StarRatings from 'react-star-ratings';

const Review = props => {
  const {classes} = props;
  return(
    <div key={props.text} className={classes.reviewBox}>
      <div>User: {props.author_name}</div>
      <div>Rating:
         <StarRatings
          rating={props.rating}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name='rating'
        />
      </div>
      <div>Comments: {props.text}</div>
    </div>
  );
}

export default withStyles(styles)(Review);
