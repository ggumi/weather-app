import React from "react";
import { Button } from 'react-bootstrap';

const WeatherButton = ({ onChangeCity }) => {
  console.log("onChangeCity",onChangeCity)
  return (
    <div>
      <Button variant="warning" onClick={ ()=>onChangeCity("current")}>Current Location</Button>
      <Button variant="warning" onClick={ ()=>onChangeCity("paris") }>paris</Button>
      <Button variant="warning" onClick={ ()=>onChangeCity("new york") }>new york</Button>
    </div>
  )
}
export default WeatherButton
