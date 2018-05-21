import React, { Component } from 'react';


const RestaurantList = props =>

  <div>
      {props.restaurants.map(item=>
        <div>
          <p>{item.restaurantName}, Ratings:{item.ratings.map(item=>

            <ul>
             <li className="text-primary">{item.stars}</li><span>{item.comment}</span>
            </ul>

          )}
          </p>
        </div>
      )}
  </div>;
export default RestaurantList;
