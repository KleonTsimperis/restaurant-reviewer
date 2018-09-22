import React from 'react';
import '../Components.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles';
import RestaurantInfo from './RestaurantInfo/RestaurantInfo';


const restaurantToShow = selectedId => item => item.place_id === selectedId;

const RestaurantReviewsCardGoogle = props => {
  const { classes } = props;
  return(
  <div className={classes.container}>
    {props.restaurantsGoogle.filter(restaurantToShow(props.restaurantId)).map(item=>{
      const overall1 = item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length;
      return(
        <RestaurantInfo
          key={props.restaurantId}
          image={props.image}
          name={item.name}
          reviews={item.reviews}
          vicinity={item.vicinity}
          formatted_phone_number={item.formatted_phone_number}
          website={item.website}
          opening_hours={item.opening_hours}
          overall1={overall1}
          overall={parseFloat(overall1.toFixed(1),10)}
        />
      );
  })}
  </div>
)}

RestaurantReviewsCardGoogle.propTypes = {
  classes: PropTypes.object.isRequired,
  restaurantsGoogle: PropTypes.array.isRequired,
  restaurantId: PropTypes.string.isRequired,
  image: PropTypes.string
};

export default withStyles(styles)(RestaurantReviewsCardGoogle);
