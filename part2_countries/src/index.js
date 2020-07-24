import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'


const FilterComp = ({filter,handleFilterChange}) => {
  
  return(
    <input
      value={filter}
      onChange={handleFilterChange}
    />
  )
}

const KeyComp =({api_key,country,setApiData,apiData,gotData,setGotData}) =>{
  
    
  
  useEffect((api_key,country,setApiData,setGotData) => {
    console.log('dentro')
    
    if(country!==''){
   
      console.log('dentro2')
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}`)
        .then(response => {  
          console.log('res')
          setApiData(response.data)
          setGotData(true)
        })
    }
  }, [])
  if (gotData===false){
    console.log('waiting')
    return(<p>waiting for data</p>)}
  if (gotData===true){
    console.log('done')
    return(
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>Main weather: {apiData.weather[0].main}</p>
        <p>Wind speed: {apiData.wind.speed}</p>
        <img src={`http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`} alt="weather" style={{width:100, height:100}}></img>
      </div>
    )
  }
  
}


const ShoWCountries = ({fCountries,buttonState,setButtonState,apiData,setApiData,api_key,gotData,setGotData}) => {
  
  let country=''
    
  if(buttonState!==''){country=buttonState}
  if(fCountries.length === 1){country=fCountries[0]}


  if(buttonState!=='' || fCountries.length === 1){
    
    return(
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map(curr_language => 
            <li key={curr_language.name}>
              {curr_language.name}
            </li>
          )}
        </ul>
        <img src={country.flag} alt="Country flag" style={{width:250, height:160}}></img>
        
        <KeyComp
          api_key={api_key}
          country={country}
          setApiData={setApiData}
          apiData={apiData}
          gotData={gotData}
          setGotData={setGotData}
        />
        
      </div>
   )
  }
  if (fCountries.length > 9) {
    return(<p>Too many matches, specify another filter</p>)
  }
  if (fCountries === '' ) {
    return(<p>Waiting for info</p>)
  }
  
  return(
    
    <ul>
      {fCountries.map(curr_country => 
        <li key={curr_country.name}>
          {curr_country.name} <button onClick={() => setButtonState(curr_country)}>details</button>
        </li>
      )}
    </ul>
    
  )
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const [ countries, setCountries ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ filteredCountries, setFilteredCountries] = useState(countries)
  const [ buttonState, setButtonState ] = useState('')
  const [ apiData, setApiData ] = useState('')
  const [ gotData, setGotData ] = useState(false)

  const handleFilterChange = (event) => {
    setButtonState('')
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(country => 
      country.name.includes(event.target.value)))
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setFilteredCountries(response.data)
        
      })
  }, [])

  return (
    <div>
      <p>Filter by name</p>
      <FilterComp
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <ShoWCountries 
        fCountries={filteredCountries}
        buttonState={buttonState}
        setButtonState={setButtonState}
        apiData={apiData}
        setApiData={setApiData}
        api_key={api_key}
        gotData={gotData}
        setGotData={setGotData}
      />
    </div>
  )
}

export default App
ReactDOM.render(<App />, document.getElementById('root'))