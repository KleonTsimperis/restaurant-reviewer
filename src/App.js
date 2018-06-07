import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import MapContainer from './MapContainer';
import Card from './components/Card';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      restaurants:[],
      restaurantName:'',
      restaurantComment:'',
      address:'',
      lat:null,
      lng:null,
      stars:null,
      open:false,
      from:1,
      to:5,
      openInput: false,


    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRestaurantNameChange = this.onRestaurantNameChange.bind(this);
    this.newRestaurantSubmitHandler = this.newRestaurantSubmitHandler.bind(this);
    this.onRestaurantCommentChange = this.onRestaurantCommentChange.bind(this);
    this.reviewRestaurantOnList = this.reviewRestaurantOnList.bind(this);
    this.toggleEditingAt = this.toggleEditingAt.bind(this);
    this.removeRestaurantFromList = this.removeRestaurantFromList.bind(this);

  }


  lastRestaurantId = 2;
  newRestaurantId = () => {
    const id = this.lastRestaurantId;
    this.lastRestaurantId += 1;
    return id;
  };

  componentDidMount(){
    axios.get('/restaurants.json')
         .then(response => {
           this.setState({restaurants:response.data})
         });
  }

  onOpenModal(){
    this.setState({ open: true });
  };

  onCloseModal(){
    this.setState({ open: false });
  };

  onRestaurantNameChange(e){
    this.setState({restaurantName:e.target.value});
  }

  onRestaurantCommentChange(e){
    this.setState({restaurantComment:e.target.value});
  }

  toggleEditingAt(id){
    this.setState({
      restaurants:this.state.restaurants.map(restaurant=>{
        if(id===restaurant.restaurantId){
          return {
            ...restaurant,
            isEditing:!restaurant["isEditing"]
          }
        }
        return restaurant;
      })
    })
  }

  newRestaurantSubmitHandler(event){
    event.preventDefault();
    const id = this.newRestaurantId();
    this.setState({
      restaurants:[
        {
          restaurantName:this.state.restaurantName,
          address:this.state.address,
          lat:this.state.lat,
          lng:this.state.lng,
          restaurantId:id,
          isEditing:false,
          ratings:[
            {
              stars:this.state.stars,
              comment:this.state.restaurantComment,
            }
          ]
        },
        ...this.state.restaurants
    ],
    restaurantName:'',
    restaurantComment:'',
    stars:null

  })
  this.onCloseModal();
  }


  onMapClickChange(x,y,info){
    this.setState(
      {
        lat:x,
        lng:y,
        address:info
      }
    )
  }

  handleChange(event){
    this.setState({stars:event.target.value})
  }


  reviewRestaurantOnList(id,text){
    this.setState({
      restaurants:this.state.restaurants.map(restaurant=>{
        if (id===restaurant.restaurantId){
          return {
            ...restaurant,
            isEditing:false,
            ratings:[
              {
              stars:this.state.stars,
              comment: this.state.restaurantComment,
              },
            ...restaurant.ratings,
            ],
          }
        }
        return restaurant;
      }),
      restaurantComment:'',
      stars:null
    })
  }

  removeRestaurantFromList(id){
    this.setState({
      restaurants:this.state.restaurants.filter(restaurant => id !== restaurant.restaurantId)
    });
  }

  handleInputChange = event => {
  this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {restaurants} = this.state;
    return (
          <div className="container-fluid p-0">

          <Navbar
            from={this.state.from}
            to={this.state.to}
            handleInputChange={this.handleInputChange}
           />

        	<div className="row">

        		<div className="col-3">
            <MapContainer
              restaurants={this.state.restaurants}
              restaurantName={this.state.restaurantName}
              restaurantComment={this.state.restaurantComment}
              address={this.state.address}
              onRestaurantNameChange={this.onRestaurantNameChange}
              onRestaurantCommentChange={this.onRestaurantCommentChange}
              newRestaurantSubmitHandler={this.newRestaurantSubmitHandler}
              onMapClickChange={(x,y,info)=>this.onMapClickChange(x,y,info)} // Example of lifting state up. The state of the child componet MapContainer is coming up to this parent component
              handleChange={ event => this.handleChange(event)}// Another exmple of lifting state up by lifting a hard coded value as can be seen in the MapContainer
              value={this.state.value}
              onOpenModal={this.onOpenModal}
              onCloseModal={this.onCloseModal}
              open={this.state.open}
            />
        	  </div>

            <div className="col-4">
            <Card
              restaurants={restaurants}
              reviewRestaurantOnList={this.reviewRestaurantOnList}
              onRestaurantCommentChange={this.onRestaurantCommentChange}
              restaurantComment={this.state.restaurantComment}
              stars={this.state.stars}
              handleChange={ event => this.handleChange(event)}
              toggleEditingAt={this.toggleEditingAt}
              removeRestaurantFromList={this.removeRestaurantFromList}
              from={this.state.from}
              to={this.state.to}
            />
        		</div>


            <div className="col-5">

        		</div>

          	</div>
          </div>
    );
  }
}



export default App;
