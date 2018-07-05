import React from 'react';
import './Components.css';
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
import Phone from '@material-ui/icons/Phone';
import Public from '@material-ui/icons/Public';
import AccessTime from '@material-ui/icons/AccessTime';
import RateReview from '@material-ui/icons/RateReview';
import Done from '@material-ui/icons/Done';
import Block from '@material-ui/icons/Block';

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
    marginBottom:10
  },
  title: {
    flex: '1 0 100%',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: '2rem!important',
    textAlign: 'center',
    maxWidth: '420px'
  },
  reviewOverall:{
    fontSize:'2rem',
  },
  icon:{
    verticalAlign:'middle',
    color:'#3f51b5'
  },
  info:{
    flex: '1 0 100%',
    textAlign: 'left',
    marginTop:2,
    marginBottom:2,
  },
  expPanel:{
    boxShadow:'none',
    flex: '1 0 100%',
    textAlign: 'left',
  },
  rr:{
    paddingLeft:5
  },
  reviewBox:{
    padding:3,
    paddingTop:6,
    margin:10,
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'
  },
  cardActions:{
    marginLeft:41.3
  },

};

const restaurantToShow = selectedId => item => item.place_id === selectedId;

const RestaurantReviewsCardGoogle = props => {
  const { classes } = props;

  return(
  <div className={classes.container}>
    {props.restaurantsGoogle.filter(restaurantToShow(props.restaurantId)).map(item=>{
      const overall1 = item.reviews.map(item=>item.rating).reduce((accumulator,initialValue)=>accumulator+initialValue) / item.reviews.length;
      const overall = parseFloat(overall1.toFixed(1),10)
      return(
        <Card className={classes.card} key={item.place_id}>
          <CardContent className={classes.content}>
            <Typography className={classes.image} variant="headline" component="h4">
              <a href={item.url} target="_blank"><img src={props.image} alt={item.name}/></a>
            </Typography>
            <Typography className={classes.title}>
              {item.name}
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
              {`${item.reviews.length} reviews`}
            </Typography>

            <div className="container">
              <div className="row set ">
                <div className="col-11 offset-1 ">
                    <LocationOn className={classes.icon}/>{item.vicinity}
                </div>
              </div>
              {item.formatted_phone_number?
              <div className="row set " >
                <div className="col-11 offset-1 ">
                  <span className="set"><Phone className={classes.icon}/> {item.formatted_phone_number}</span>
                </div>
              </div>:null}

              {item.website?
              <div className="row set" >
                <div className="col-11 offset-1 " >
                  <a href={item.website} target="_blank" className={classes.url}><Public className={classes.icon}/> {item.website}</a>
                </div>
              </div>
              :null}

              {item.opening_hours?
              <div className="row set">
                <div className="col-11 offset-1 ">
                  {item.opening_hours.open_now? <Done className={classes.icon}/>:<Block className={classes.icon}/>}    {item.opening_hours.open_now? "Now Open" : "Now Closed"}
                </div>
              </div>
              :null}

              {item.opening_hours?
              <div className="row">
                <div className="col-11 offset-1">
                  <Typography className={classes.info}>
                    <ExpansionPanel className={classes.expPanel}>
                      <ExpansionPanelSummary style={{padding:0}} expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.info}><AccessTime className={classes.icon}/><span className={classes.rr}>Opening Hours</span></Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          {item.opening_hours.weekday_text.map(day=>
                            <div key={day}>
                              {day}
                            </div>
                          )}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </Typography>
                </div>
              </div>: null}

              {item.reviews?
              <div className="row">
                <div className="col-11 offset-1">
                  <Typography className={classes.info}>
                    <ExpansionPanel className={classes.expPanel}>
                      <ExpansionPanelSummary style={{padding:0}} expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.info}><RateReview className={classes.icon}/><span className={classes.rr}>Recent Reviews</span></Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          {item.reviews.map(review =>
                            <div key={review.text} className={classes.reviewBox}>
                              <p>User: {review.author_name}</p>
                              <p>Rating: <StarRatings
                                rating={review.rating}
                                starRatedColor="orange"
                                starDimension="20px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name='rating'
                              />
                              </p>
                              <p>Comments: {review.text}</p>
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

RestaurantReviewsCardGoogle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantReviewsCardGoogle);
