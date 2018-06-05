import React from 'react';
import Modal from 'react-responsive-modal';
import Form2 from './Form2';







const Restaurant = props =>

<div>
  {props.restaurants.map(item=>{
    const overall = item.ratings.map(item=>item.stars).reduce((initialValue,accumulator)=>initialValue+accumulator) / item.ratings.length;
    var capitalizedRestaurantName = item.restaurantName;
    capitalizedRestaurantName = capitalizedRestaurantName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });

    return   <div className="container m-2" key={item.restaurantId}>
              <div className="row">

                <div className="col-4">



                        <Form2
                              reviewRestaurantOnList={(e)=> props.reviewRestaurantOnList(item.restaurantId,e)}
                              onRestaurantCommentChange={props.onRestaurantCommentChange}
                              restaurantComment={props.restaurantComment}
                              stars={props.stars}
                              handleChange={ event => props.handleChange(event)}

                         />
    

                </div>


                <div className="col-4">
                  {item.ratings.map(item=>item.comment)}
                </div>




                <div className="col-4">
                  <h4 className="">{capitalizedRestaurantName}</h4>
                  <p>{item.address}</p>


                  {overall === 5 &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>}
                  {(overall > 4 && overall < 5)  &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star-half"></i>
                    </div>}
                    {overall === 4 &&
                      <div>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>}
                  {(overall > 3 && overall < 4)  &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star-half"></i>
                    </div>}
                  {overall === 3 &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>}
                  {(overall > 2 && overall < 3)  &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star-half"></i>
                    </div>}
                  {overall === 2 &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </div>}
                  {(overall > 1 && overall < 2)  &&
                    <div>
                      <i className="far fa-star"></i>
                      <i className="far fa-star-half"></i>
                    </div>}
                  {overall === 1 &&
                    <div>
                      <i className="far fa-star"></i>
                    </div>}
                </div>

              </div>
            </div>
          })}
</div>;




export default Restaurant;
