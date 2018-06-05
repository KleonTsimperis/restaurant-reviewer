import React from 'react';

const Form2 = props =>{
  if(props.isEditing){
  return <form>
    <div className="modal-body p-0">
      <textarea value={props.restaurantComment} onChange={props.onRestaurantCommentChange} className="form-control" rows="3" placeholder="Provide your feedback in this area..."></textarea>
    </div>
    <select className="custom-select w-50" id="inlineFormCustomSelectPref" value={props.value} onChange={props.handleChange}>
      <option defaultValue>Rate your visit</option>
      <option value="1" onClick={()=> props.handleChange(1)}>1</option>
      <option value="2" onClick={()=> props.handleChange(2)}>2</option>
      <option value="3" onClick={()=> props.handleChange(3)}>3</option>
      <option value="4" onClick={()=> props.handleChange(4)}>4</option>
      <option value="5" onClick={()=> props.handleChange(5)}>5</option>
    </select>
    <button type="button" className="btn btn-primary w-50" onClick={()=>props.reviewRestaurantOnList()}>Save changes</button>
  </form>
  }
  return<button onClick={props.toggleEditingAt}>Edit</button>;
}

export default Form2;
