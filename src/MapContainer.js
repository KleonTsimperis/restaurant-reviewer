import React, { Component, Fragment } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Form from './components/Form';
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
     console.log(map);
     const { markers } = this.state;
     const lat = event.latLng.lat();
     const lng = event.latLng.lng();
     let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
     axios.get(url).then(response => {
       console.log(response.data);
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
    height: 'calc(100vh - 80px)',
    }
    return (
    <div style={{position:'relative'}}>

    <Modal open={this.props.open} onClose={this.props.onCloseModal} center className="modal">
      <Form
        newRestaurantSubmitHandler={this.props.newRestaurantSubmitHandler}
        restaurantName={this.props.restaurantName}
        onRestaurantNameChange={this.props.onRestaurantNameChange}
        restaurantComment={this.props.restaurantComment}
        address={this.props.address}
        handleChange={this.props.handleChange}
        onRestaurantCommentChange={this.props.onRestaurantCommentChange}
      />
    </Modal>

    <Map
     google={this.props.google}
     zoom={5}
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
      open={this.props.snackBarError}
      autoHideDuration={6000}
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

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA')
})(MapContainer)
