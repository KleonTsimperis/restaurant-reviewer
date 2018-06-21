import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import MaterialUIForm from './MaterialUIForm';

const styles = {
  card: {
    minWidth: 275,
    margin:5,
    paddingRight:0,

  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    display:"inline"
  },
  pos: {
    marginBottom: 12,
    padding:10,
    display:"inline"
  },
};

const ratingAbove = isAbove => item =>
  item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length >= isAbove;

const ratingBelow = isBelow => item =>
  item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length <= isBelow;

const RestaurantCardFromLocal = props => {

  const { classes } = props;
  return (
    <div>
        {props.restaurants.filter(ratingAbove(props.from)).filter(ratingBelow(props.to)).map(item=> {
          const overall = item.ratings.map(item=>item.stars).reduce((accumulator,initialValue) => accumulator + initialValue) / item.ratings.length;
          var capitalizedRestaurantName = item.restaurantName;
          capitalizedRestaurantName = capitalizedRestaurantName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
          });
    return  <Card className={classes.card} key={item.restaurantId}>
              <CardContent>
                <Typography variant="headline" className={classes.title}>
                  {capitalizedRestaurantName} <Typography className={classes.pos} color="textSecondary">{item.address}</Typography>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Rating:{overall}
                </Typography>
              </CardContent>
              <CardActions>
                {!item.isEditing?<Button size="large" onClick={()=>props.toggleEditingAt(item.restaurantId)}>Add Review</Button> : <span></span> }
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => props.removeRestaurantFromList(item.restaurantId)}>
                  Delete
                  <Delete className={classes.rightIcon} />
                </Button>

                <Button variant="contained" color="secondary" className={classes.button} onClick={() => props.getRestaurantId(item.restaurantId,item.lat, item.lng)}>
                  See Reviews
                </Button>
              </CardActions>
            </Card>
                })}
          </div>

        );
      }

RestaurantCardFromLocal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantCardFromLocal);
