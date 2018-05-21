import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import FaAnchor from "react-icons/lib/fa/anchor";

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
<GoogleMap
   defaultZoom={8}
   defaultCenter={{ lat: props.lat, lng: props.lng }}
 >
   <Marker
     position={{ lat: props.lat, lng: props.lat }}
   />
 </GoogleMap>
);


class MyFancyComponent extends React.PureComponent {
  constructor(props){
    super(props);
    this.state={
      isMarkerShown: false,
    }
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}

        {...this.props}
      />

    )
  }
}

export default MyFancyComponent;
