import React from 'react';
import './Components.css';

const Form = props =>

  <div  className="form text-white">
    <h2 ref={subtitle => this.subtitle = subtitle} className="text-center">Submit your review</h2>
    <form onSubmit={props.newRestaurantSubmitHandler} id="userForm">
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
          <input type="email" className="form-control" />
        </div>
      </div>
      <div className="row m-3 mt-5">
        <div className="col">
          <label>Restaurant name</label>
          <input value={props.restaurantName} onChange={(e)=>props.onRestaurantNameChange(e)} type="text" className="form-control"/>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">
          <label>Comments</label>
          <textarea value={props.restaurantComment} onChange={(e)=>props.onRestaurantCommentChange(e)} className="form-control" rows="3" placeholder="Provide your feedback in this area..."></textarea>
        </div>
      </div>
      <div className="row m-3">
        <div className="col">
          <label>Address</label>
          <div>{props.address}</div>
        </div>
      </div>
      <div className="row m-3  my-1 mr-sm-2 pb-3">
        <div className="col col-md-6">
        <select className="custom-select" id="inlineFormCustomSelectPref" value={props.value} onChange={props.handleChange}>
          <option defaultValue>Rate your visit</option>
          <option value="1" onClick={()=> props.handleChange(1)}>1</option>
          <option value="2" onClick={()=> props.handleChange(2)}>2</option>
          <option value="3" onClick={()=> props.handleChange(3)}>3</option>
          <option value="4" onClick={()=> props.handleChange(4)}>4</option>
          <option value="5" onClick={()=> props.handleChange(5)}>5</option>
        </select>
        </div>
        <div className="col col-md-6">
          <button type="submit" className="btn btn-primary mx-auto text-center" style={{width:"200px"}} onSubmit={props.newRestaurantSubmitHandler}>Submit Review</button>
        </div>
      </div>
    </form>
  </div>

export default Form;
