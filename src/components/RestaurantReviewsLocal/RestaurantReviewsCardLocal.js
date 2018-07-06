import React from 'react';
import '../Components.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOn from '@material-ui/icons/LocationOn';
import RateReview from '@material-ui/icons/RateReview';
import styles from './Styles';

const restaurantToShow = selectedId => item => item.restaurantId === selectedId;

const RestaurantReviewsCardLocal = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      {props.restaurants.filter(restaurantToShow(props.restaurantId)).map(item=>{
        const overall1 = item.ratings.map(item=>item.stars).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.ratings.length;
        const overall = parseFloat(overall1.toFixed(1),10)
        return(
          <Card className={classes.card} key={item.restaurantId}>
            <CardContent className={classes.content}>
              <Typography className={classes.image} variant="headline" component="h4">
                <img src={props.image} alt={item.restaurantName}/>
              </Typography>
              <Typography className={classes.title}>
                {item.restaurantName}
              </Typography>
              <Typography className={classes.stars} variant="headline" component="h2">
                <StarRatings
                  rating={overall}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="2px"
                  numberOfStars={5}
                  name='rating'
                />
              </Typography>
              <Typography className={classes.rating}>
                <span className={classes.reviewOverall}>{overall}</span>
              </Typography>
              <Typography className={classes.rating}>
                {`${item.ratings.length} reviews`}
              </Typography>

              <div className="container">
                <div className="row set ">
                  <div className="col-11 offset-1 ">
                      <LocationOn className={classes.icon}/>{item.address}
                  </div>
                </div>

                {item.ratings?
                <div className="row">
                  <div className="col-11 offset-1">
                    <Typography className={classes.info} component="p">
                      <ExpansionPanel className={classes.expPanel}>
                        <ExpansionPanelSummary style={{padding:0}} expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.info}><RateReview className={classes.icon}/><span className={classes.rr}>Recent Reviews</span></Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <Typography>
                            {item.ratings.map(review =>
                              <div key={review.comment} className={classes.reviewBox}>
                                <p>User: {review.author_name}</p>
                                <p>Rating: <StarRatings
                                  rating={review.stars}
                                  starRatedColor="orange"
                                  starDimension="20px"
                                  starSpacing="2px"
                                  numberOfStars={5}
                                  name='rating'
                                />
                                </p>
                                <p>Comments: {review.comment}</p>
                              </div>
                            )}
                          </Typography>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </Typography>
                  </div>
                </div>:null}

              </div>
        </CardContent>
      </Card>
      )})}
    </div>
)}

RestaurantReviewsCardLocal.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurants: PropTypes.array.isRequired,
  restaurantId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(RestaurantReviewsCardLocal);
