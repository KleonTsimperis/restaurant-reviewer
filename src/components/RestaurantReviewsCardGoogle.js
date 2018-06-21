import React from 'react';
import './Components.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  container: {
    marginTop:5,
    marginBottom:5,
  },
  card: {
    minWidth: 275,
  },
  content: {
    padding:0,
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  image: {
    flex: '1 0 100%',
    textAlign: 'center',
    padding:5
  },
  stars: {
    flex: '1 0 100%',
    textAlign: 'center'
  },
  rating:{
    flex: '1 0 100%',
    textAlign: 'center',
    marginTop:10
  },
  title: {
    flex: '1 0 100%',
    marginBottom: 16,
    textAlign: 'center',
  },
  reviewOverall:{
    fontSize:'2.5rem',
  },
  address:{
    flex: '1 0 100%',
    padding: 5,
    margin: 5,
    textAlign: 'center',
  },
  phone_number:{
    flex: '1 0 100%',
    padding: 5,
    margin: 5,
    textAlign: 'center',
  }
};



const RestaurantReviewsCardGoogle = props => {
  const { classes } = props;
  const restaurantToShow = selectedId => item => item.place_id === selectedId;
  return(
  <div className={classes.container}>
    {props.restaurantsGoogle.filter(restaurantToShow(props.restaurantId)).map(item=> {
      const overall = item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length;
return <Card className={classes.card} key={item.place_id}>
          <CardContent className={classes.content}>
            <Typography className={classes.image} variant="headline" component="h2">
              <a href={item.url} target="_blank"><img src={props.image} alt={item.name}/></a>
            </Typography>
            <Typography className={classes.title}  className="restaurantInfoCard">
              {item.name}
            </Typography>

            <Typography className={classes.stars} variant="headline" component="h2">
              <StarRatings
                rating={overall}
                starRatedColor="yellow"
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
              {`${item.reviews.length} reviews`}
            </Typography>
            <Typography className={classes.address} component="p">
              Address: {item.formatted_address}
            </Typography>
            <Typography className={classes.phone_number} component="p">
              {/*Phone: {item.formatted_phone_number}*/}
              
            </Typography>
            <Typography className={classes.phone_number} component="p">
              {item.opening_hours.weekday_text.map(day=>
                <div>
                  {day}
                </div>
              )}
            </Typography>

          </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
      }
    )}
  </div>
);
}

RestaurantReviewsCardGoogle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantReviewsCardGoogle);
