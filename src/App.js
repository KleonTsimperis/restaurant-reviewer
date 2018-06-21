import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MapContainer from './MapContainer';
import RestaurantCardFromLocal from './components/RestaurantCardFromLocal';
import RestaurantCardFromGoogle from './components/RestaurantCardFromGoogle';
import RestaurantReviewCard from './components/RestaurantReviewCard';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      restaurants:[],
      restaurantsFetchedFromGoogle:[],
      restaurantName:'',
      restaurantComment:'',
      address:'',
      restaurantId:null,
      placeId:null,
      lat:null,
      lng:null,
      geoLat:null,
      geoLng:null,
      stars:null,
      open:false,
      from:1,
      to:5,
      image:null,
      k:false

    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.onRestaurantNameChange = this.onRestaurantNameChange.bind(this);
    this.newRestaurantSubmitHandler = this.newRestaurantSubmitHandler.bind(this);
    this.onRestaurantCommentChange = this.onRestaurantCommentChange.bind(this);
    this.reviewRestaurantOnList = this.reviewRestaurantOnList.bind(this);
    this.toggleEditingAt = this.toggleEditingAt.bind(this);
    this.removeRestaurantFromList = this.removeRestaurantFromList.bind(this);
    this.getRestaurantId = this.getRestaurantId.bind(this);
    this.getStreetView = this.getStreetView.bind(this);
    this.clicked = this.clicked.bind(this);
  }


  lastRestaurantId = 2;
  newRestaurantId = () => {
    const id = this.lastRestaurantId;
    this.lastRestaurantId += 1;
    return id;
  };

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>{
    this.setState({geoLat:position.coords.latitude,geoLng:position.coords.longitude});
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=5000&keyword=recensioni&type=restaurant&types=restaurant&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
         .then(response => this.setState({restaurantsFetchedFromGoogle:response.data.results}));
    });
    axios.get('/restaurants.json')
         .then(response =>this.setState({restaurants:response.data}));
  }

  clicked(){
    this.state.restaurantsFetchedFromGoogle.map(item=>{
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
           .then(response => this.setState({placeId:response.data}))
           .catch(err =>{
            console.log(err);
            console.log(err.response.data.error);
           });
  });
  this.setState({k:!this.state.k});
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
    const stars = parseInt(this.state.stars);
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
              stars,
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

  liftGeolocationUp(x,y){
    this.setState(
      {
        geoLat:x,
        geoLng:y
      }
    )
  }

  handleChange(event){
    this.setState({stars:event.target.value})
  }


  reviewRestaurantOnList(id,text){
    const stars = parseInt(this.state.stars);
    console.log(stars);
    this.setState({
      restaurants:this.state.restaurants.map(restaurant=>{
        if (id===restaurant.restaurantId){
          return {
            ...restaurant,
            isEditing:false,
            ratings:[
              {
              stars:stars,
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

  getRestaurantId(id,lat,lng){
    this.setState({restaurantId:id});
    this.getStreetView(lat,lng);
  }

  getStreetView(lat,lng){
    let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
    axios.get(url)
         .then(response=>this.setState({image:response.config.url}));
  }

  render() {
    const {restaurants} = this.state;
    return (
          <div className="container-fluid p-0">
            <AppBar position="static" color="default">
              <Navbar
                from={this.state.from}
                to={this.state.to}
                handleInputChange={this.handleInputChange}
               />
            </AppBar>
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
            liftGeolocationUp={(x,y)=>this.liftGeolocationUp(x,y)}
          />
      	  </div>

          <div className="col-5">
          <RestaurantCardFromLocal
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
            getRestaurantId={this.getRestaurantId}
            getStreetView={this.getStreetView}
            restaurantsFetchedFromGoogle={this.state.restaurantsFetchedFromGoogle}
          />

          <RestaurantCardFromGoogle
            restaurantsFetchedFromGoogle={this.state.restaurantsFetchedFromGoogle}
          />


      		</div>


          <div className="col-4">
          <RestaurantReviewCard
            restaurants={restaurants}
            restaurantId={this.state.restaurantId}
            image={this.state.image}
          />
      		</div>

        	</div>
        </div>
    );
  }
}



export default App;
