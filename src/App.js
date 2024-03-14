import './App.css';
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherButton from "./component/WeatherButton";
/**
 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다
 2. 날씨정보에는 도시,썹씨 화씨 날씨상태
 3. 5개의 버튼이 있다(1개는 현재위치, 4개는 다른도시)
 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다
 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
 */

// function WeatherBox(props) {
//   console.log("props",props)
//   // console.log("props",!!(props.info))
//   const city = props.info&&props.info.name
//   const celcius =  props.info&&(props.info.main.temp - 273)
//   const fahrenheit = props.info&&Math.floor(celcius * (9 / 5) + 32)
//   const description =  props.info&&props.info.data.name
//   return (
//
//   );
// }

function City(props) {
  return (
    <>
      <button>{props.title}</button>
    </>
  )
}

function App() {
  const [ weather, setWeather]= useState(null);
  const [ city, setCity ] = useState("current")
  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat= position.coords.latitude
      let lon= position.coords.longitude
      let result =getWeatherByCurrentLocation(lat,lon)
    })
  }

   const getWeatherByCurrentLocation = async(lat, lon) =>{
     let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=56255f942c76ef9ee6914380f9d064db&units=metric`
     let response = await fetch(url)
     let data = await response.json();
     setWeather(data);
  }

  const getWeatherByCity = async(city) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56255f942c76ef9ee6914380f9d064db&units=metric`;
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
  }

  useEffect(()=>{
    getCurrentLocation()
  },[])

  useEffect(()=>{
    if(city === 'current'){
      getCurrentLocation()
    } else {
      getWeatherByCity(city)
    }
  },[city])


  return (
    <>
      <div className="container">
        <WeatherBox weather={weather}></WeatherBox>
        <WeatherButton onChangeCity={(city)=>{
          console.log("city",city)
          setCity(city)}}></WeatherButton>
      </div>
    </>
  );
}

export default App;
