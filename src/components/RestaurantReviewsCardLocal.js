import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    marginTop: 5,
    marginBottom: 5
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12,
  },
};

const RestaurantReviewCard = props => {
  const { classes } = props;
  const restaurantToShow = selectedId => item => {
    return item.restaurantId === selectedId;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Reviews for...
          </Typography>
          <Typography>
            {props.restaurants.filter(restaurantToShow(props.restaurantId)).map(item=>
                <div>
                    <Typography variant="headline" component="h2">{item.restaurantName}</Typography>
                      {item.ratings.map(item=>
                          <div>
                            <Typography variant="body">{item.comment}. Review:{item.stars}</Typography>

                          </div>
                      )}
                </div>
            )}
            <img src={props.image}/>
          </Typography>

        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

RestaurantReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantReviewCard);
