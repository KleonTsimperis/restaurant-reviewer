import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import Form from './Form';
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
    return  <Card className={classes.card} key={item.restaurantId}>
              <CardContent className={classes.container2}>
              <h5 className={classes.title}>{item.restaurantName}</h5>
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
