import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [criteria, setCriteria] = useState("");
  const baseUrl = "https://restcountries.eu/rest/v2/";
  const handleShowClick = (event, count) => {
    event.preventDefault();
    setCriteria(count.name);
  }
  useEffect(() => {
    axios.get(baseUrl + "all")
          .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => setCriteria(event.target.value);
  const filteredCountries = criteria.length > 0 && criteria != null ?
                              countries.filter(count => count.name.toLowerCase()
                              .includes(criteria.toLowerCase())) :
                              [];
  
  return (
    <div>
      <Search value={criteria} onChange={handleSearch}/>
      <Countries onClick={handleShowClick} countries={filteredCountries}/>
      
    </div>
  );
}

const Search = (props) => {
  return (
    <div>
      <strong>find countries </strong><input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const Countries = (props) => 
      props.countries.length < 10 ?
          props.countries.length === 1 ?
            <CountryDetail country={props.countries[0]}/> 
            :
            props.countries
              .map(country => 
              <div key={country.name}>
              <Country 
                                name={country.name}/>
              <Show onClick={(e) => props.onClick(e, country)}/>
              </div>
              
                  )
          :
          <p>Too many matches, specify another filter.</p>

const Country = ({name}) => {
  return (
    <span>{name}</span>
  )
}

const CountryDetail = ({country}) =>{
  const languages = country.languages.map(item => <li key={item.nativeName}>{item.name}</li>)
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <ul>
        {languages}
      </ul>
      <img src={country.flag} style={{height: 100, width: 100}} alt={country.name}/>
      <Weather name={country.name}/>
    </div>
  )
}

const Show = (props) => <><button onClick={props.onClick}>show</button><br/></>

const Weather =({name}) => {
  const [weather, setWeather] = useState(null);
  const baseUrl = "http://api.weatherstack.com/current?access_key=81ceb0373d784268f1d00e8d48012b4b&query="
  useEffect(() => {
    axios.get(baseUrl + name)
          .then(response => {
            setWeather(response.data)
          })
  }, [name])
  return (
    <div>
      <h3>Weather in {name}</h3>
      <div>{weather !== null ? <WeatherDetail weather={weather}/> : "loading..."}</div>
    </div>
  )
}

const WeatherDetail = ({weather : {current}}) => {
  console.log(current);
  return (
  <>
  <p><strong>temperature</strong>: {current.temperature}<sup>o</sup>Celcius</p>
  <img src={current.weather_icons[0]} alt="weather temp" />
  <p><strong>wind</strong>: {current.wind_speed}kph direction {current.wind_dir}</p>
  </>
  )
}
export default App;
