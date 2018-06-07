import React, { Component, Fragment } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import Form from './components/Form';

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
    navigator.geolocation.getCurrentPosition(position=>
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
      }));
   }

   mapClicked = (mapProps, map, event) => {
     const { markers } = this.state;
     const lat = event.latLng.lat();
     const lng = event.latLng.lng();
     let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA`
     axios.get(url).then(response => {
       this.setState({
       googleReverseGeolocation:response.data.results[0].formatted_address,
       markers:[{  position:{lat:event.latLng.lat(),lng:event.latLng.lng()}  }, ...markers],
       latClick:lat,
       lngClick:lng
     });
     this.props.onMapClickChange(lat, lng, response.data.results[0].formatted_address);
   });
     this.props.onOpenModal();
   }



   onMarkerClick(props, marker, e) {
     alert('clicked');
   }


  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    const style = {
    width: '100%',
    height: '100vh'
    }
    return (
    <Fragment>
      <div>
        <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
          <Form
            newRestaurantSubmitHandler={this.props.newRestaurantSubmitHandler}
            restaurantName={this.props.restaurantName}
            onRestaurantNameChange={this.props.onRestaurantNameChange}
            restaurantComment={this.props.restaurantComment}
            address={this.props.address}
            handleChange={this.props.handleChange}
            onRequestClose={this.props.closeModal}
            onRestaurantCommentChange={this.props.onRestaurantCommentChange}
          />
        </Modal>
      </div>


      <Map
       google={this.props.google}
       zoom={11}
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
         />
       )}





      </Map>
    </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA')
})(MapContainer)
