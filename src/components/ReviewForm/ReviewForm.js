import React from 'react';
import StarRatings from 'react-star-ratings';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import '../Components.css';


const ReviewForm = props =>

  <div className="container reviewForm mt-2">
      <h5 className="text-center p-4">Provide your Feedback</h5>
        <div className="row m-3">
          <div className="col">
            <label>First name</label>
            <input type="text" value={props.firstName} name="firstName" onChange={props.handleInputChange} className="form-control"/>
            <label style={{color:"red"}}>{props.firstName.length>=2? '' : props.firstNameError}</label>
          </div>
          <div className="col">
            <label>Last name</label>
            <input type="text" value={props.lastName} name="lastName" onChange={props.handleInputChange} className="form-control"/>
            <label style={{color:"red"}}>{props.lastName.length>=2? '' : props.lastNameError}</label>
          </div>
        </div>
        <div className="row m-3">
          <div className="col">
            <label>Email</label>
            <input type="email" value={props.email} name="email" onChange={props.handleInputChange} className="form-control"/>
            <label style={{color:"red"}}>{props.email.indexOf("@") !== -1 ? '' : props.emailError}</label>
          </div>
        </div>
        <div className="row m-3 mt-5 text-center">
          <div className="col"> <h6>Restaurant</h6></div>
        </div>
        <div className="row m-3 text-center">
          <div className="col px-3 mb-3"><h5>{props.restaurantName}</h5></div>
        </div>
        <div className="row m-3 text-center">
          <div className="col col-md-12">
            <h6>Address</h6>
          </div>
        </div>
        <div className="row m-3 mb-5 text-center">
          <div className="col col-md-12">
              <h5>{props.address}</h5>
          </div>
        </div>
        <div className="row m-3">
          <div className="col">
            <textarea value={props.restaurantComment} name="restaurantComment" onChange={props.handleInputChange} className="form-control" rows="4" placeholder="Provide your comments in this area..."></textarea>
            <label style={{color:"red"}}>{props.restaurantComment.length>=5? '' : props.restaurantCommentError}</label>
          </div>
        </div>
        <div className="row m-3 text-center">
          <div className="col col-lg-4 m-0 mt-3 pt-2 px-0">
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
          <div className="col col-lg-4 m-0 mt-3 px-1">
            <Button size="large" onClick={() => props.addReview(props.isLocal)}>Submit Review</Button>
          </div>
          <div className="col col-lg-4 m-0 mt-3 mb-3">
            <Button size="large" onClick={() => props.discardReviewForm()}>Cancel</Button>
          </div>
        </div>
    </div>;

ReviewForm.propTypes = {
  addReview: PropTypes.func.isRequired,
  discardReviewForm: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  firstName: PropTypes.string.isRequired,
  firstNameError: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  lastNameError: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailError: PropTypes.string.isRequired,
  restaurantName: PropTypes.string.isRequired,
  restaurantNameError: PropTypes.string.isRequired,
  onRestaurantNameChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  restaurantComment: PropTypes.string.isRequired,
  restaurantCommentError: PropTypes.string.isRequired
}



export default ReviewForm;
