import React, {Fragment} from 'react';
import '../../../Components.css';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import styles from '../../Styles';

const MainInfo = props => {
  const {classes} = props;
  return(
    <Fragment>
      <Typography className={classes.image} variant="headline" component="h4">
        <a href={props.url} target="_blank"><img src={props.image} alt={props.name}/></a>
      </Typography>
      <Typography className={classes.title}>
        {props.name}
      </Typography>
      <Typography className={classes.stars} variant="headline" component="h2">
        <StarRatings
          rating={props.overall}
          starRatedColor="orange"
          starDimension="20px"
          starSpacing="2px"
          numberOfStars={5}
          name='rating'
        />
      </Typography>
      <Typography className={classes.rating}>
        <span className={classes.reviewOverall}>{props.overall}</span>
      </Typography>
      <Typography className={classes.rating}>
        {`${props.reviews.length} reviews`}
      </Typography>
    </Fragment>
  );
}

export default withStyles(styles)(MainInfo);
