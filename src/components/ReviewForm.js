import React from 'react';
import StarRatings from 'react-star-ratings';
import Button from '@material-ui/core/Button';
import './Components.css';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ReviewForm = props =>


    <div className="reviewForm mt-2">
            <h6 ref={subtitle => this.subtitle = subtitle} className="text-center">Provide your Feedback</h6>
              <div className="row m-3">
                <div className="col">
                  <label>First name</label>
                  <input type="text" className="form-control"/>
                </div>
                <div className="col">
                  <label>Last name</label>
                  <input type="text" className="form-control"/>
                </div>
              </div>
              <div className="row m-3">
                <div className="col">
                  <label>Email</label>
                  <input type="email" className="form-control"/>
                </div>
              </div>
              <div className="row m-3 text-center">
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
              <div className="row m-3 text-center">
                <div className="col col-md-12">
                  {props.address}
                </div>
              </div>
              <div className="row m-3">
                <div className="col">
                  <textarea value={props.restaurantComment} onChange={(e)=>props.onRestaurantCommentChange(e)} className="form-control" rows="2" placeholder="Provide your comments in this area..."></textarea>
                </div>
              </div>
              <div className="row m-3 text-center">
                <div className="col col-md-5 m-0 mt-3 pt-1 px-0">
                <StarRatings
                  rating={props.stars}
                  starRatedColor="yellow"
                  changeRating={props.changeRating}
                  numberOfStars={5}
                  starSpacing="3px"
                  name='rating'
                  starDimension='20px'
                />
                </div>
                <div className="col col-md-4 m-0 mt-3 px-1">
                  <Button size="large" onClick={() => props.addReview()}>Submit Review</Button>
                </div>
                <div className="col col-md-3 m-0 mt-3 mb-3">
                  <Button size="large" onClick={() => props.discardReviewForm()}>Cancel</Button>
                </div>
              </div>
          </div>





export default ReviewForm;
