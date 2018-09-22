import React from 'react';
import '../../../Components.css';
import PhoneNumber from './PhoneNumber/PhoneNumber';
import Website from './Website/Website';
import OpeningHours from './OpeningHours/OpeningHours';
import Reviews from './Reviews/Reviews';
import Address from './Address/Address';


const AdditionalInfo = props =>

   <div className="container">
     <Address vicinity={props.vicinity} />
     <PhoneNumber formatted_phone_number={props.formatted_phone_number}/>
     <Website website={props.website}/>
     <OpeningHours opening_hours={props.opening_hours}/>
     <Reviews reviews={props.reviews} />
   </div>;




export default AdditionalInfo;
