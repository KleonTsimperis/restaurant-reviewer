import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import data from './restaurants/restaurants.json';
import MapContainer from './MapContainer';



class App extends Component {


  state={
    restaurants:[],
  }

  // componentDidMount(){
  //   axios.get('./restaurants/restaurants.json')
  //        .then(response=>{
  //          console.log(response);
  //          this.setState({restaurants:response})
  //        });
  // }



  render() {
    return (

        <div className="container-fluid pl-0">
          <div className="row">
        		<div className="col-4 ">


            <MapContainer/>


        		</div>
        		<div className="col-5 pl-3">
            <nav className="navbar navbar-light bg-light">
              <span className="navbar-brand mb-0 h1">Navbar</span>
            </nav>







        		</div>
        		<div className="col-3">





        		</div>
        	</div>
        </div>

    );
  }
}

export default App;
