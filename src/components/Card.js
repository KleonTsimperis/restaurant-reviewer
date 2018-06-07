import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Form2 from './Form2';
import Delete from '@material-ui/icons/Delete';

const styles = {
  card: {
    minWidth: 275,
    margin:20
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

const SimpleCard = props => {

  const { classes } = props;
  return (
    <div>
        {props.restaurants.filter(ratingAbove(props.from)).filter(ratingBelow(props.to)).map((item,index)=> {
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
                  <i className="far fa-star"></i>
                </Typography>
                <Typography component="p">
                </Typography>
                      <Form2
                        reviewRestaurantOnList={(text)=> props.reviewRestaurantOnList(item.restaurantId,text)}
                        onRestaurantCommentChange={(text)=>props.onRestaurantCommentChange(text)}
                        restaurantComment={props.restaurantComment}
                        stars={props.stars}
                        handleChange={ event => props.handleChange(event)}
                        isEditing={item.isEditing}
                        toggleEditingAt={()=> props.toggleEditingAt(item.restaurantId)}
                       />
              </CardContent>
              <CardActions>
                {!item.isEditing?<Button size="large" onClick={()=>props.toggleEditingAt(item.restaurantId)}>Add Review</Button> : <span></span> }
                <Button variant="contained" color="secondary" className={classes.button} onClick={() => props.removeRestaurantFromList(item.restaurantId)}>
                  Delete
                  <Delete className={classes.rightIcon} />
                </Button>
              </CardActions>
            </Card>
                })}
          </div>

        );
      }

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);