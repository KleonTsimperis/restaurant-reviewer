import React, { Component } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from './MapContainer';
import Static from './components/Static/';
import RestaurantCardFromLocal from './components/RestaurantCardLocal/RestaurantCardFromLocal';
import RestaurantCardFromGoogle from './components/RestaurantCardGoogle/RestaurantCardFromGoogle';
import RestaurantReviewsCardLocal from './components/RestaurantReviewsLocal/RestaurantReviewsCardLocal';
import RestaurantReviewsCardGoogle from './components/RestaurantReviewsGoogle/RestaurantReviewsCardGoogle';
import ReviewForm from './components/ReviewForm/ReviewForm';
import SnackBarSubmission from './components/SnackBarSubmission/SnackBarSubmission';
import {styles} from './styles/Styles';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      restaurants:[],
      restaurantsGoogle:[],
      restaurantName:'',
      restaurantNameError:'',
      restaurantComment:'',
      restaurantCommentError:'',
      address:'',
      firstName:'',
      firstNameError:'',
      lastName:'',
      lastNameError:'',
      email:'',
      emailError:'',
      restaurantId:null,
      lat:null,
      lng:null,
      geoLat:null,
      geoLng:null,
      stars:5,
      open:false,
      from:1,
      to:5,
      image:null,
      showReviewForm:false,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false,
      snackBarMapError:false,
      snackBarSubmission:false,
      snackBarSubmissionError:false,
      searchTerm:'',
      isLocal:true
    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.newRestaurantSubmitHandler = this.newRestaurantSubmitHandler.bind(this);
    this.toggleEditingAt = this.toggleEditingAt.bind(this);
    this.removeRestaurantFromList = this.removeRestaurantFromList.bind(this);
    this.getRestaurantId = this.getRestaurantId.bind(this);
    this.getStreetView = this.getStreetView.bind(this);
    this.assignIsEditing = this.assignIsEditing.bind(this);
    this.addReview = this.addReview.bind(this);
    this.discardReviewForm = this.discardReviewForm.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.openRecentReviewsGoogle = this.openRecentReviewsGoogle.bind(this);
    this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
    this.handleCloseSnackBar = this.handleCloseSnackBar.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.validate = this.validate.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }


  lastRestaurantId = 2;
  newRestaurantId = () => {
    const id = this.lastRestaurantId;
    this.lastRestaurantId += 1;
    return id;
  };

   _isMounted = false;


   componentDidMount(){
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(position=>{
    this.setState({geoLat:position.coords.latitude,geoLng:position.coords.longitude});
       axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=50000&type=restaurant&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`, {headers:{'Access-Control-Allow-Origin': 'http://localhost:3009/'}})
         .then(response=>{
           response.data.results.map(item=>
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`, {headers:{'Access-Control-Allow-Origin': 'http://localhost:3009/'}})
            .then(response=>{
              if(this._isMounted){
                this.setState(prevState=>({restaurantsGoogle:[...prevState.restaurantsGoogle, response.data.result]}))
              }
            })
           )
         })
    });
    axios.get('/restaurants.json')
         .then(response =>this.setState({restaurants:response.data}));
  }

  clearFilters(){
    this.setState({
      searchTerm:'',
      from:1,
      to:5
    })
  }



  handleOpenSnackBar(check){
    if (check==='error'){
      this.setState({
        snackBarMapError:true
      })
    }
    if (check==='submission'){
      this.setState({
        snackBarSubmission:true
      })
    }
    if (check==='errSubmission'){
      this.setState({
        snackBarSubmissionError:true
      })
    }
  }

  handleCloseSnackBar(check){
    if (check==='errorClose'){
      this.setState({
        snackBarMapError:false
      })
    }
    if (check==='submission'){
      this.setState({
        snackBarSubmission:false
      })
    }
    if (check==='errSubmission'){
      this.setState({
        snackBarSubmissionError:false
      })
    }
  }

  onOpenModal(){
    this.setState({
      open:true
     })
  }

  onCloseModal(){
    this.setState({
      open:false
    })
  }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value });
  }

  clearForm(){
    this.setState({
      firstName:'',
      firstNameError:'',
      lastName:'',
      lastNameError:'',
      email:'',
      emailError:'',
      restaurantName:'',
      restaurantNameError:'',
      restaurantComment:'',
      restaurantCommentError:'',
      stars:5
    })
  }

  validate(){
    let isError = false;
    const errors = {
      firstNameError:'',
      lastNameError:'',
      emailError:'',
      restaurantCommentError:'',
      restaurantNameError:''
    }
    if(this.state.firstName.length<2){
      isError = true;
      errors.firstNameError = 'Invalid first-name length'
    }
    if(this.state.lastName.length<2){
      isError = true;
      errors.lastNameError = 'Invalid last-name length'
    }
    if(this.state.email.indexOf("@") === -1){
      isError = true;
      errors.emailError = 'Invalid email'
    }
    if(this.state.restaurantName.length<2){
      isError = true;
      errors.restaurantNameError = 'Invalid Restaurant name'
    }
    if(this.state.restaurantComment.length<5){
      isError = true;
      errors.restaurantCommentError = 'Invalid comments length'
    }
    this.setState({
      ...errors
    })
    return isError;
  }

  newRestaurantSubmitHandler(event){
    event.preventDefault();
    const id = this.newRestaurantId();
    const stars = parseInt(this.state.stars,10);
    const err = this.validate();
    if(!err){
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
              author_name:`${this.state.firstName} ${this.state.lastName}`,
              stars,
              comment:this.state.restaurantComment,
            }
          ]
        },
        ...this.state.restaurants
    ],
      firstName:'',
      firstNameError:'',
      lastName:'',
      lastNameError:'',
      email:'',
      emailError:'',
      restaurantName:'',
      restaurantNameError:'',
      restaurantComment:'',
      restaurantCommentError:'',
      stars:5
    })
      this.onCloseModal();
      this.handleOpenSnackBar('submission');
    }
    if(err){
      this.handleOpenSnackBar('errSubmission');
    }
  }

  addReview(isLocal){
    const stars = parseInt(this.state.stars,10);
    const err = this.validate();
    if(!err){
    if(isLocal===true){
      this.setState({
        restaurants:this.state.restaurants.map(item=>{
          if(item.isEditing){
            return {
              ...item,
              ratings:[
                {
                  author_name:`${this.state.firstName} ${this.state.lastName}`,
                  stars,
                  comment:this.state.restaurantComment
                },
                ...item.ratings
              ],
              isEditing:false,
            }
          }
          return item;
        }),
        restaurantComment:'',
        stars:5,
        showReviewForm:false
      })
    } else {
    this.setState({
      restaurantsGoogle:this.state.restaurantsGoogle.map(item=>{
        if(item.isEditing){
          return {
            ...item,
            reviews:[
              {
                author_name:`${this.state.firstName} ${this.state.lastName}`,
                rating:stars,
                text:this.state.restaurantComment
              },
              ...item.reviews
            ],
            isEditing:false,
          }
        }
        return item;
      }),
      restaurantComment:'',
      stars:5,
      showReviewForm:false
    });
      this.handleOpenSnackBar('submission');
      }
    }
  }

  onMapClickChange(x,y,info){
    this.setState({
        lat:x,
        lng:y,
        address:info
      })
    }

  liftGeolocationUp(x,y){
    this.setState({
        geoLat:x,
        geoLng:y
      })
  }

  changeRating(newRating){
      this.setState({stars:newRating})
  }


  removeRestaurantFromList(id){
    this.setState({
      restaurants:this.state.restaurants.filter(restaurant => id !== restaurant.restaurantId),
      restaurantsGoogle:this.state.restaurantsGoogle.filter(restaurant => id !== restaurant.place_id),
      showReviewForm:false,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false
    });
  }


  getRestaurantId(id,lat,lng){
    this.setState({
      restaurantId:id,
      showRestaurantReviewsCardLocal:true,
      showReviewForm:false
    });
    this.getStreetView(lat,lng);
  }

  getStreetView(lat,lng){
    let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&heading=0&pitch=-0.76&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
    axios.get(url)
         .then(response=>this.setState({image:response.config.url}));
  }

  openRecentReviewsGoogle(place_id,lat,lng){
    axios.get(`http://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&heading=0&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
    .then(response=>{
       this.setState({image:response.config.url})
    })
    this.setState({
        restaurantId:place_id,
        showRestaurantReviewsCardGoogle:true,
        showRestaurantReviewsCardLocal:false,
        showReviewForm:false
      })
  }

  toggleEditingAt(id,restaurantName,address,rating){
    this.setState({
      restaurants:this.state.restaurants.map(item=>{
        if(item.isEditing){
          return {
            ...item,
            isEditing:false
          }
        }
        if(id===item.restaurantId){
          return {
            ...item,
            isEditing: true
          }
        }
        return item;
      }),
    isLocal:true,
    showReviewForm:true,
    showRestaurantReviewsCardLocal:false,
    showRestaurantReviewsCardGoogle:false,
    restaurantName,
    address,
    stars:rating
  })
  }

  assignIsEditing(id,name,vicinity,rating){
    this.setState({restaurantsGoogle:this.state.restaurantsGoogle.map(item=>{
      if(item.isEditing){
        return {
         ...item,
         isEditing:false
        }
      }
      if (id === item.place_id){
        return {
          ...item,
          isEditing:true
        }
      }
      return item;
    }),
      isLocal:false,
      showReviewForm:true,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false,
      restaurantName:name,
      address:vicinity,
      stars:rating
  });
  }

  discardReviewForm(){
    this.setState({restaurants:this.state.restaurants.map(item=>{
      if (item.isEditing){
        return {
          ...item,
          isEditing:false
        }
      }
      return item;
    })})
    this.setState({restaurantsGoogle:this.state.restaurantsGoogle.map(item=>{
      if (item.isEditing){
        return {
          ...item,
          isEditing:false
        }
      }
      return item;
    })})
    this.setState({showReviewForm:false});
  };



  render() {
    const {restaurants} = this.state;
    const {classes} = this.props;
    return (
      <div style={{height:'100vh', overflow:'hidden'}}>
        <AppBar position="absolute" color="default">
          <Navbar
            from={this.state.from}
            to={this.state.to}
            handleInputChange={this.handleInputChange}
            searchTerm={this.state.searchTerm}
            clearFilters={this.clearFilters}
           />
        </AppBar>

        <Grid container spacing={8} className={classes.root}>
          <Grid item md={3}>
            <MapContainer
              firstName={this.state.firstName}
              firstNameError={this.state.firstNameError}
              lastName={this.state.lastName}
              lastNameError={this.state.lastNameError}
              email={this.state.email}
              emailError={this.state.emailError}
              restaurants={this.state.restaurants}
              restaurantName={this.state.restaurantName}
              restaurantNameError={this.state.restaurantNameError}
              restaurantComment={this.state.restaurantComment}
              restaurantCommentError={this.state.restaurantCommentError}
              address={this.state.address}
              handleInputChange={this.handleInputChange}
              newRestaurantSubmitHandler={this.newRestaurantSubmitHandler}
              onMapClickChange={(x,y,info)=>this.onMapClickChange(x,y,info)} // Example of lifting state up. The state of the child componet MapContainer is coming up to this parent component
              value={this.state.value}
              onOpenModal={this.onOpenModal}
              onCloseModal={this.onCloseModal}
              open={this.state.open}
              liftGeolocationUp={(x,y)=>this.liftGeolocationUp(x,y)}
              restaurantsGoogle={this.state.restaurantsGoogle}
              handleOpenSnackBar={this.handleOpenSnackBar}
              handleCloseSnackBar={this.handleCloseSnackBar}
              snackBarMapError={this.state.snackBarMapError}
              changeRating={this.changeRating}
              stars={this.state.stars}
            />
          </Grid>


          <Grid item  md={5} className={classes.resultsContainer}>
            <RestaurantCardFromLocal
              restaurants={restaurants}
              restaurantComment={this.state.restaurantComment}
              stars={this.state.stars}
              toggleEditingAt={this.toggleEditingAt}
              removeRestaurantFromList={this.removeRestaurantFromList}
              from={this.state.from}
              to={this.state.to}
              getRestaurantId={this.getRestaurantId}
              getStreetView={this.getStreetView}
              searchTerm={this.state.searchTerm}
            />

            {this.state.restaurantsGoogle?<RestaurantCardFromGoogle
              restaurantsGoogle={this.state.restaurantsGoogle}
              assignIsEditing={this.assignIsEditing}
              from={this.state.from}
              to={this.state.to}
              changeRating={this.changeRating}
              removeRestaurantFromList={this.removeRestaurantFromList}
              openRecentReviewsGoogle={this.openRecentReviewsGoogle}
              searchTerm={this.state.searchTerm}
            /> : <div>loading</div>}

          </Grid>

          <Grid item  md={4} className={classes.reviewFormContainer}>
          {this.state.showRestaurantReviewsCardLocal && <RestaurantReviewsCardLocal
            restaurants={restaurants}
            restaurantId={this.state.restaurantId}
            image={this.state.image}
          />}

          {this.state.showRestaurantReviewsCardGoogle && <RestaurantReviewsCardGoogle
            restaurantId={this.state.restaurantId}
            restaurantsGoogle={this.state.restaurantsGoogle}
            image={this.state.image}
          />}

          {this.state.showReviewForm && <ReviewForm
            restaurantsGoogle={this.state.restaurantsGoogle}
            stars={this.state.stars}
            changeRating={this.changeRating}
            handleInputChange={this.handleInputChange}
            address={this.state.address}
            addReview={this.addReview}
            discardReviewForm={this.discardReviewForm}
            snackBarSubmission={this.state.snackBarSubmission}
            handleOpenSnackBar={this.handleOpenSnackBar}
            handleCloseSnackBar={this.handleCloseSnackBar}
            isLocal={this.state.isLocal}
            firstName={this.state.firstName}
            firstNameError={this.state.firstNameError}
            lastName={this.state.lastName}
            lastNameError={this.state.lastNameError}
            email={this.state.email}
            emailError={this.state.emailError}
            restaurantName={this.state.restaurantName}
            restaurantNameError={this.state.restaurantNameError}
            restaurantComment={this.state.restaurantComment}
            restaurantCommentError={this.state.restaurantCommentError}
          />}

          {<Static/>}
          </Grid>

          <SnackBarSubmission
            snackBarSubmissionError={this.state.snackBarSubmissionError}
            snackBarSubmission={this.state.snackBarSubmission}
            handleCloseSnackBar={this.handleCloseSnackBar}
           />
        </Grid>
    </div>
    );
  }
}



export default withStyles(styles)(App);
