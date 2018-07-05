import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';

const styles = {
  card: {
    minWidth: 275,
    margin:5,
  },
  container1: {
    display: 'flex',
    flexDirection: 'column',
  },
  container2: {
    display: 'flex',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    padding:18,
    paddingBottom:6,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    paddingTop:0,
    flexBasis: '70%',
    marginRight: 'auto'
  },
  ratingStars: {
    marginBottom: 8,
    flexBasis: '30%',
    textAlign: 'right'
  },
  vicinity: {
    flex: '1 0 90%'
  },
  ratingInteger: {
    flex: '1 0 10%',
    textAlign: 'right'
  },
  buttonRemove:{
    marginLeft:'auto',
    marginRight: -3
  },
  buttonAdd:{
    marginLeft:-4
  }
};

const ratingAbove = isAbove => item =>
  item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length >= isAbove;

const ratingBelow = isBelow => item =>
  item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length <= isBelow;

const restaurantName = isName => item =>
  item.name.toLowerCase().includes(isName.toLowerCase());


const RestaurantCardFromGoogle = props => {
  const { classes } = props;
  return(
    <div className={classes.container1}>
      {props.restaurantsGoogle.filter(restaurantName(props.searchTerm)).filter(ratingAbove(props.from)).filter(ratingBelow(props.to)).map(item=>{
      const overall1 = item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length;
      const overall = parseFloat(overall1.toFixed(1));
      return(
        <Card className={classes.card} key={item.place_id}>
            <CardContent className={classes.container2}>
              <h5 className={classes.title}>{item.name}</h5>
              <Typography variant="subheading" className={classes.ratingStars}>
                <StarRatings
                  rating={overall}
                  starRatedColor="orange"
                  starDimension="20px"
                  starSpacing="3px"
                  numberOfStars={5}
                  name='rating'
                />
              </Typography>
              <Typography variant="body1" className={classes.vicinity}>
                 {item.vicinity}
              </Typography>
              <Typography variant="title" className={classes.ratingInteger}>
                 {overall}
              </Typography>
            </CardContent>
            <CardActions className={classes.container2}>
              <Button variant="contained" color="primary" size="small"  className={classes.buttonAdd} onClick={()=>props.assignIsEditing(item.place_id,item.name,item.vicinity,overall)}>
                ADD REVIEW
              </Button>
              <Button  color="primary" size="small"  onClick={()=>props.openRecentReviewsGoogle(item.place_id, item.geometry.location.lat,item.geometry.location.lng)}>
                RESTAURANT INFO
              </Button>
              <Button variant="contained" color="secondary" size="small" className={classes.buttonRemove} onClick={()=>props.removeRestaurantFromList(item.place_id)}>
                REMOVE
              </Button>
            </CardActions>
        </Card>
      );
        })}
      </div>
    );
}

  RestaurantCardFromGoogle.propTypes = {
    classes: PropTypes.object.isRequired,
    restaurantsGoogle: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    assignIsEditing: PropTypes.func.isRequired,
    openRecentReviewsGoogle: PropTypes.func.isRequired,
    removeRestaurantFromList: PropTypes.func.isRequired,
  };

export default withStyles(styles)(RestaurantCardFromGoogle);
