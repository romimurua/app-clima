import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'


function App() {
  const [weather, setWeather] = useState({})
  const [isTemperature, setIsTemperature] = useState(true)

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
      const crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=f71c6ce33f1b2db3104c71c9545427e2&units=metric`)
        .then(res => setWeather(res.data))

      

    }

    
    
  })

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weather?.name},${weather.sys?.country}&appid=f71c6ce33f1b2db3104c71c9545427e2`)
            
    }, [])

  console.log(weather)
  

  return (
    <div className="App">
      <h1 className='title'>Weather App</h1>
      <h3 className='location'>{weather?.name}, {weather.sys?.country} <img className='icon' src={`http://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}.png`} alt="icon" /></h3>
      <h4>{isTemperature ? weather.main?.temp : weather.main?.temp*9/5+32 } {isTemperature ? 'ºC' : 'ºF'}</h4>
      <h4>{weather.weather?.[0].description}</h4>
      <h4>humidity: {weather.main?.humidity}%</h4>   
      <h4>wind speed: {weather.wind?.speed} m/s</h4>
      <button className="button" onClick={() => setIsTemperature(!isTemperature)}>Degrees {isTemperature ? 'ªF' : 'ºC'}</button>
      
    </div>
  )
}

export default App
