import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import FaAnchor from "react-icons/lib/fa/anchor";

const MyMapComponentTest = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
  )((props) =>

  class MyMapComponentTest extends React.Component{
    constructor(props){
      super(props);
      this.state={
        lat:null,
        lng:null,
        isMarkerShown: false,
      }
    }
    componentDidMount() {
      navigator.geolocation.getCurrentPosition(position=>
        this.setState({
          lat:position.coords.latitude,
          lng:position.coords.longitude,
        },
        error => console.log(error)
      )
      );
    }

    render(){
      return(
        <GoogleMap
           defaultZoom={8}
           defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
         >
           <Marker
             position={{ lat: this.state.lat, lng: this.state.lng }}
           />
         </GoogleMap>
      );
    }


  }


);



export default MyMapComponentTest;
