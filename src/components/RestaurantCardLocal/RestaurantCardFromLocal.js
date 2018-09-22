import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StarRatings from 'react-star-ratings';
import styles from './Styles'

const ratingAbove = isAbove => item =>
  item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length >= isAbove;

const ratingBelow = isBelow => item =>
  item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length <= isBelow;

const restaurantName = isName => item =>
  item.restaurantName.toLowerCase().includes(isName.toLowerCase());

const RestaurantCardFromLocal = props => {
  const { classes } = props;
  return (
    <div className={classes.container1}>
      {props.restaurants.filter(restaurantName(props.searchTerm)).filter(ratingAbove(props.from)).filter(ratingBelow(props.to)).map(item=> {
        const overall1 = item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length;
        const overall = parseFloat(overall1.toFixed(1));
        var capitalizedRestaurantName = item.restaurantName;
        capitalizedRestaurantName = capitalizedRestaurantName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase();
        });
        return(
          <Card className={classes.card} key={item.restaurantId}>
            <CardContent className={classes.container2}>
            <h5 className={classes.title}>{capitalizedRestaurantName}</h5>
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
               {item.address}
            </Typography>
            <Typography variant="title" className={classes.ratingInteger}>
               {overall}
            </Typography>
            </CardContent>
            <CardActions className={classes.container2}>
            <Button variant="contained" color="primary" size="small"  className={classes.buttonAdd} onClick={()=>props.toggleEditingAt(item.restaurantId,item.restaurantName,item.address,overall)}>
              ADD REVIEW
            </Button>
            <Button  color="primary" size="small"  onClick={() => props.getRestaurantId(item.restaurantId,item.lat, item.lng)}>
              RESTAURANT INFO
            </Button>
            <Button variant="contained" color="secondary" size="small" className={classes.buttonRemove} onClick={()=>props.removeRestaurantFromList(item.restaurantId)}>
              REMOVE
            </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
    );
  }

      RestaurantCardFromLocal.propTypes = {
        classes: PropTypes.object.isRequired,
        restaurants: PropTypes.array.isRequired,
        searchTerm: PropTypes.string.isRequired,
        from: PropTypes.number.isRequired,
        to: PropTypes.number.isRequired,
        toggleEditingAt: PropTypes.func.isRequired,
        getRestaurantId: PropTypes.func.isRequired,
        removeRestaurantFromList: PropTypes.func.isRequired,
      };

export default withStyles(styles)(RestaurantCardFromLocal);
