import React from 'react';
import PropTypes from 'prop-types';
import '../Components.css';
import StarRatings from 'react-star-ratings';
import Button from '@material-ui/core/Button';

const Form = props =>

  <div className="form">
    <h4 ref={subtitle => this.subtitle = subtitle} className="text-center pt-3">Submit your review</h4>
    <form onSubmit={props.newRestaurantSubmitHandler} id="userForm">
      <div className="row m-3">
        <div className="col">
          <label>First name</label>
          <input type="text" value={props.firstName} name="firstName" onChange={props.handleInputChange} className="form-control"/>
          <label style={{color:'red'}}>{props.firstName.length>=2?'':props.firstNameError}</label>
        </div>
        <div className="col">
          <label>Last name</label>
          <input type="text" value={props.lastName} name="lastName" onChange={props.handleInputChange} className="form-control"/>
          <label style={{color:'red'}}>{props.lastName.length>=2?'':props.lastNameError}</label>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">
          <label>Email</label>
          <input type="email" value={props.email} name="email" onChange={props.handleInputChange} className="form-control"/>
          <label style={{color:'red'}}>{props.email.indexOf("@") !== -1?'':props.emailError}</label>
        </div>
      </div>
      <div className="row m-3 mt-5">
        <div className="col">
          <label>Restaurant name</label>
          <input value={props.restaurantName} name="restaurantName" onChange={props.handleInputChange} type="text" className="form-control"/>
          <label style={{color:'red'}}>{props.restaurantName.length>=2?'':props.restaurantNameError}</label>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">
          <label>Comments</label>
          <textarea value={props.restaurantComment} onChange={props.handleInputChange} className="form-control" rows="3" placeholder="Provide your feedback in this area..."></textarea>
          <label style={{color:'red'}}>{props.restaurantComment.length>=5?'':props.restaurantCommentError}</label>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">
          <label>Address</label>
          <div>{props.address}</div>
        </div>
      </div>
      <div className="row m-3  my-1 mr-sm-2 pb-3 align-items-center">
        <div className="col col-md-6 m-0 text-center">
        <StarRatings
          rating={props.stars}
          starRatedColor="orange"
          changeRating={props.changeRating}
          numberOfStars={5}
          starSpacing="3px"
          name='rating'
          starDimension='20px'
        />
        </div>
        <div className="col col-md-6 m-0">
          <Button type="submit" size="large" onSubmit={props.newRestaurantSubmitHandler}>Submit Review</Button>
        </div>
      </div>
    </form>
  </div>;

  Form.propTypes = {
    newRestaurantSubmitHandler: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    firstNameError: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    lastNameError: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    emailError: PropTypes.string.isRequired,
    restaurantName: PropTypes.string.isRequired,
    restaurantNameError: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    restaurantComment: PropTypes.string.isRequired,
    restaurantCommentError: PropTypes.string.isRequired
  }

export default Form;
