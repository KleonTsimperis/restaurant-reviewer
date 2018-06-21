import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 5,
    marginBottom: 5
  },
  textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,

    },
  input:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField2: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },


});

function MaterialUIForm(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
    <Card className={classes.card}>
    <CardContent>

      <Grid container spacing={16} justify={"space-between"}>

        <Grid item xs={6}>
        <TextField
          id="with-placeholder"
          label="First Name"
          placeholder="First Name"
          className={classes.textField}
        />
        </Grid>

        <Grid item xs={6}>
        <TextField
          id="with-placeholder"
          label="Last Name"
          placeholder="Last Name"
          className={classes.textField}
        />
        </Grid>

        <Grid item xs={12}>
        <TextField
          id="with-placeholder"
          label="Email"
          placeholder="Email"
          className={classes.input}
          fullWidth
        />
        </Grid>

        <Grid item xs={12}>
        <TextField
          id="multiline-flexible"
          label="Comments"
          multiline
          rowsMax="4"
          fullWidth
          className={classes.textField2}
          rows="4"
          value={props.restaurantComment}
          onChange={props.onRestaurantCommentChange}
        />
        </Grid>





        <Grid item xs={2}>
        <Select
          value={props.stars}
          onChange={props.handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
          fullWidth
          className={classes.textField}
        >
          <MenuItem value={props.stars}>
            <em>1</em>
          </MenuItem>
          <MenuItem value={1} onClick={()=>props.handleChange(1)}>1</MenuItem>
          <MenuItem value={2} onClick={()=>props.handleChange(2)}>2</MenuItem>
          <MenuItem value={3} onClick={()=>props.handleChange(3)}>3</MenuItem>
          <MenuItem value={4} onClick={()=>props.handleChange(4)}>4</MenuItem>
          <MenuItem value={5} onClick={()=>props.handleChange(5)}>5</MenuItem>
        </Select>
        </Grid>

        <Grid item xs={5}>
        <Button  color="primary" fullWidth onClick={()=>props.addReview()} >
          Submit Review
        </Button>
        </Grid>

        <Grid item xs={5}>
        <Button size="small" variant="contained" color="secondary" onClick={()=>props.discardReviewForm()}>
          Discard
        <Delete/>
        </Button>
        </Grid>






      </Grid>
      </CardContent>
      </Card>
    </div>
  );

}

MaterialUIForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIForm);
