import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import PropTypes from 'prop-types';
import './styles/App.css';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Form from './components/Form/Form';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      lat:null,
      lng:null,
      googleReverseGeolocation:null,
      markers:[],
      latClick:null,
      lngClick:null,
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>{
      this.props.liftGeolocationUp(position.coords.latitude,position.coords.longitude);
      return  this.setState({
                lat:position.coords.latitude,
                lng:position.coords.longitude,
              })
      })
   }

   mapClicked = (mapProps, map, event) => {
     const { markers } = this.state;
     const lat = event.latLng.lat();
     const lng = event.latLng.lng();
     let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
     axios.get(url).then(response => {
       if(response.data.status === "OK"){
         this.setState({
           googleReverseGeolocation:response.data.results[0].formatted_address,
           markers:[{  position:{lat:event.latLng.lat(),lng:event.latLng.lng()}  }, ...markers],
           latClick:lat,
           lngClick:lng
         });
        this.props.onMapClickChange(lat, lng, response.data.results[0].formatted_address);
        this.props.onOpenModal();
      }
      else {
        this.props.handleOpenSnackBar('error');
      }
   });
   }

   onMarkerClick(props, marker, e) {
     alert('clicked');
   }

   onMouseoverMarker(props, marker, e) {
   }


  render() {
    if (!this.props.loaded) {
     return <div>Loading...</div>
   }
    const style = {
      width: '100%',
      height: '100vh',
      position: 'relative'
    }
    return (
    <div style={style}>
      <Modal
       open={this.props.open}
       onClose={this.props.onCloseModal}
       center className="styles_closeButton__20ID4"
       closeIconSize={30}
       >
        <Form
          firstName={this.props.firstName}
          firstNameError={this.props.firstNameError}
          lastName={this.props.lastName}
          lastNameError={this.props.lastNameError}
          email={this.props.email}
          emailError={this.props.emailError}
          handleInputChange={this.props.handleInputChange}
          newRestaurantSubmitHandler={this.props.newRestaurantSubmitHandler}
          restaurantName={this.props.restaurantName}
          restaurantNameError={this.props.restaurantNameError}
          restaurantComment={this.props.restaurantComment}
          restaurantCommentError={this.props.restaurantCommentError}
          address={this.props.address}
          changeRating={this.props.changeRating}
          stars={this.props.stars}
        />
      </Modal>

    <Map
     google={this.props.google}
     zoom={10}
     style={style}
     initialCenter={{
        lat: this.state.lat,
        lng: this.state.lng
     }}
     center={{
        lat: this.state.lat,
        lng: this.state.lng
     }}
     onClick={this.mapClicked}
     >
     <Marker
       title={'You are here'}
       position={{
         lat:this.state.lat,
         lng:this.state.lng
       }}
       icon={{
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      }}
     />
     {this.props.restaurants.map(marker =>
       <Marker
         key={marker.restaurantId}
         title={marker.restaurantName}
         position={{ lat:marker.lat, lng:marker.lng}}
         draggable={marker.draggable}
         onClick={this.onMarkerClick}
         onMouseover={this.onMouseoverMarker}
       />
     )}
     {this.props.restaurantsGoogle.map(marker =>
       <Marker
         key={marker.id}
         title={marker.name}
         position={{ lat:marker.geometry.location.lat, lng:marker.geometry.location.lng}}
         draggable={marker.draggable}
         onClick={this.onMarkerClick}
         onMouseover={this.onMouseoverMarker}
       />
     )}
    </Map>
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.props.snackBarMapError}
      autoHideDuration={3000}
      onClose={()=>this.props.handleCloseSnackBar('errorClose')}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">Invalid Location</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={()=>this.props.handleCloseSnackBar('errorClose')}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
    </div>
    );
  }
}

MapContainer.propTypes = {
  liftGeolocationUp: PropTypes.func.isRequired,
  onMapClickChange: PropTypes.func,
  onOpenModal: PropTypes.func,
  handleOpenSnackBar: PropTypes.func,
  google: PropTypes.object.isRequired,
  restaurants: PropTypes.array.isRequired,
  restaurantsGoogle: PropTypes.array.isRequired,
  snackBarMapError: PropTypes.bool.isRequired,
  handleCloseSnackBar: PropTypes.func.isRequired
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA')
})(MapContainer)
