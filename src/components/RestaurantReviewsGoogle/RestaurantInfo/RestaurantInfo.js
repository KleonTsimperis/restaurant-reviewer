import React from 'react';
import '../../Components.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from '../Styles';
import MainInfo from './MainInfo/MainInfo';
import AdditionalInfo from './AdditionalInfo/AdditionalInfo';

const RestaurantInfo = props => {
  const {classes} = props;
  return(
    <Card className={classes.card} key={props.place_id}>
      <CardContent className={classes.content}>
        <MainInfo
          url={props.url}
          image={props.image}
          name={props.name}
          overall={props.overall}
          reviews={props.reviews}
        />
        <AdditionalInfo
          formatted_phone_number={props.formatted_phone_number}
          website={props.website}
          opening_hours={props.opening_hours}
          reviews={props.reviews}
          vicinity={props.vicinity}
        />
        </CardContent>
    </Card>
  );
};

export default withStyles(styles)(RestaurantInfo)
