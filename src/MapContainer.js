import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class MapContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      lat:null,
      lng:null,
    }
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=>
      this.setState({
        lat:position.coords.latitude,
        lng:position.coords.longitude,
      }));
   }

   mapClicked(mapProps, map, clickEvent) {
     alert('yo');
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
      <Map
       google={this.props.google}
       zoom={12}
       style={style}
       center={{
            lat: this.state.lat,
            lng: this.state.lng,
       }}
       onClick={this.mapClicked}
       >

        <Marker onClick={this.onMarkerClick}
          name={'Current location'} />

        <Marker
          title={'Geolocation'}
          position={{
            lat:this.state.lat,
            lng:this.state.lng,
          }}

        />

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 42, lng: 13}}
         />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>

            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCZ7rgMN34kWkGvr8Pzkf_8nkT7W6gowBA')
})(MapContainer)
