import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import MapContainer from './MapContainer';
import RestaurantCardFromLocal from './components/RestaurantCardFromLocal';
import RestaurantCardFromGoogle from './components/RestaurantCardFromGoogle';
import RestaurantReviewsCardLocal from './components/RestaurantReviewsCardLocal';
import RestaurantReviewsCardGoogle from './components/RestaurantReviewsCardGoogle';
import MaterialUIForm from './components/MaterialUIForm';
import ReviewForm from './components/ReviewForm';



const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow:"hidden",
    position:"relative",
    top:80,
    bottom:40
  },
  resultsContainer:{
    height:"90vh",
    overflow:"scroll",
    paddingTop:10,
    paddingBottom:80,
    marginBottom:80
  },
  reviewFormContainer:{
    maxWidth: "33%",
    height:"90vh",
    paddingTop:10,
    overflow:"scroll",
  },

});


class App2 extends Component {
  constructor(props){
    super(props);
    this.state={
      restaurants:[],
      restaurantsFetchedFromGoogle:[],
      restaurantName:'',
      restaurantComment:'',
      address:'',
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
      openReviewForm:false,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false,
      restaurantsGoogle:[],
      snackBarError:false,
      snackBarSubmission:false,
    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRestaurantNameChange = this.onRestaurantNameChange.bind(this);
    this.newRestaurantSubmitHandler = this.newRestaurantSubmitHandler.bind(this);
    this.onRestaurantCommentChange = this.onRestaurantCommentChange.bind(this);
    this.reviewRestaurantOnList = this.reviewRestaurantOnList.bind(this);
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
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=50000&keyword=recensioni&type=restaurant&types=restaurant&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
         .then(response=>{
               console.log(response.data.results)
           response.data.results.map(item=>{
            axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${item.place_id}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
            .then(response=>{

              this.setState(prevState=>({restaurantsGoogle:[...prevState.restaurantsGoogle, response.data.result]}))
            })
           })
         })
    });
    axios.get('/restaurants.json')
         .then(response =>this.setState({restaurants:response.data}));
  }

  handleOpenSnackBar(check){
    if (check==='error'){
      this.setState({
        snackBarError:true
      })
    }
    if (check==='submission'){
      this.setState({
        snackBarSubmission:true
      })
    }
  }

  handleCloseSnackBar(check){
    if (check==='errorClose'){
      this.setState({
        snackBarError:false
      })
    }
    if (check==='submission'){
      this.setState({
        snackBarSubmission:false
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

  onRestaurantNameChange(e){
    this.setState({restaurantName:e.target.value});
  }

  onRestaurantCommentChange(e){
    this.setState({restaurantComment:e.target.value});
  }

  toggleEditingAt(id){
    if(this.state.showRestaurantReviewsCardLocal){
      this.setState({showRestaurantReviewsCardLocal:false})
    }
    this.setState({
      restaurants:this.state.restaurants.map(restaurant=>{
        if(id===restaurant.restaurantId){
          return {
            ...restaurant,
            isEditing: true
          }
        }
        return restaurant;
      })
    ,openReviewForm:true
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
    stars:5
  })
  this.onCloseModal();
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

  handleChange(event){
    this.setState({stars:event.target.value})
  }

  changeRating( newRating ){
      this.setState({
        stars:newRating
      })
  }

  reviewRestaurantOnList(id,text){
    const stars = parseInt(this.state.stars);
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
      stars:5
    })
  }

  removeRestaurantFromList(id){
    this.setState({
      restaurants:this.state.restaurants.filter(restaurant => id !== restaurant.restaurantId),
      restaurantsGoogle:this.state.restaurantsGoogle.filter(restaurant => id !=restaurant.place_id),
      openReviewForm:false,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false
    });
  }

  handleInputChange = event => {
  this.setState({ [event.target.name]: event.target.value });
  };



  getRestaurantId(id,lat,lng){
    if (this.state.openReviewForm){
      this.setState({openReviewForm:false})
    }
    this.setState({restaurantId:id,showRestaurantReviewsCardLocal:true});
    this.getStreetView(lat,lng);
  }

  getStreetView(lat,lng){
    let url = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&heading=151.78&pitch=-0.76&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
    axios.get(url)
         .then(response=>this.setState({image:response.config.url}));
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
      openReviewForm:true,
      showRestaurantReviewsCardLocal:false,
      showRestaurantReviewsCardGoogle:false,
      restaurantName:name,
      address:vicinity,
      stars:rating
  });
  }


  addReview(id){
    const stars = parseInt(this.state.stars);
    // this.setState({
    //   restaurants:this.state.restaurants.map(restaurant=>{
    //     if(restaurant.isEditing){
    //       return {
    //         ...restaurant,
    //         ratings:[
    //           {
    //           stars:stars,
    //           comment: this.state.restaurantComment
    //           },
    //           ...restaurant.ratings
    //         ],
    //         isEditing:false
    //       }
    //     }
    //     return restaurant;
    //   }),
    //   restaurantComment:'',
    //   stars:5,
    //   openReviewForm:false
    // });
    this.setState({
      restaurantsGoogle:this.state.restaurantsGoogle.map(restaurant=>{
        if(restaurant.isEditing){
          return {
            ...restaurant,
            reviews:[
              {
              rating:stars,
              text:this.state.restaurantComment
              },
              ...restaurant.reviews
            ],
            isEditing:false,
          }
        }
        return restaurant;
      }),
      restaurantComment:'',
      stars:5,
      openReviewForm:false
    })
    this.handleOpenSnackBar('submission');
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
    this.setState({openReviewForm:false});

  };

  openRecentReviewsGoogle(place_id,lat,lng){
    axios.get(`http://maps.googleapis.com/maps/api/streetview?size=433x150&location=${lat},${lng}&heading=0&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`)
    .then(response=>{
      console.log(response)
       this.setState({image:response.config.url})
    })
    this.setState(
      {
        restaurantId:place_id,
        showRestaurantReviewsCardGoogle:true,
        showRestaurantReviewsCardLocal:false,
        openReviewForm:false
      }
    )
  }

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
           />
        </AppBar>

        <Grid container spacing={8} className={classes.root}>
          <Grid item  md={3}>
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
            restaurantsGoogle={this.state.restaurantsGoogle}
            handleOpenSnackBar={this.handleOpenSnackBar}
            handleCloseSnackBar={this.handleCloseSnackBar}
            snackBarError={this.state.snackBarError}
          />
          </Grid>


          <Grid item  md={5} className={classes.resultsContainer}>
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
          />

          <RestaurantCardFromGoogle
            restaurantsGoogle={this.state.restaurantsGoogle}
            assignIsEditing={this.assignIsEditing}
            from={this.state.from}
            to={this.state.to}
            changeRating={this.changeRating}
            removeRestaurantFromList={this.removeRestaurantFromList}
            openRecentReviewsGoogle={this.openRecentReviewsGoogle}
          />
          </Grid>




          <Grid item  md={4} className={classes.reviewFormContainer}>
          {this.state.showRestaurantReviewsCardLocal && <RestaurantReviewsCardLocal
            restaurants={restaurants}
            restaurantId={this.state.restaurantId}
            image={this.state.image}
          />}
          {this.state.showRestaurantReviewsCardGoogle &&
          <RestaurantReviewsCardGoogle
            restaurantId={this.state.restaurantId}
            restaurantsGoogle={this.state.restaurantsGoogle}
            image={this.state.image}
          />
          }

          {false &&
             <MaterialUIForm
                className={classes.form}
                stars={this.state.stars}
                restaurantComment={this.state.restaurantComment}
                handleChange={this.handleChange}
                onRestaurantCommentChange={this.onRestaurantCommentChange}
                addReview={this.addReview}
                discardReviewForm={this.discardReviewForm}
              />
          }

          {this.state.openReviewForm &&
            <ReviewForm
              restaurantsGoogle={this.state.restaurantsGoogle}
              stars={this.state.stars}
              restaurantComment={this.state.restaurantComment}
              changeRating={this.changeRating}
              onRestaurantCommentChange={this.onRestaurantCommentChange}
              restaurantName={this.state.restaurantName}
              address={this.state.address}
              addReview={this.addReview}
              openReviewForm={this.state.openReviewForm}
              discardReviewForm={this.discardReviewForm}
              snackBarSubmission={this.state.snackBarSubmission}
              handleOpenSnackBar={this.handleOpenSnackBar}
              handleCloseSnackBar={this.handleCloseSnackBar}
            />
          }
          </Grid>

        </Grid>
    </div>
    );
  }
}



export default withStyles(styles)(App2);
