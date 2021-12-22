import axios from "axios";
import React, { useEffect, useState } from "react";

const App6 = () => {

    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(null)

    const searchCountry = (currentQuery) => {
        axios.get('https://restcountries.com/v3.1/all')
            .then((response) => {
                const fetchedCountries = response.data
                const filteredCountries = fetchedCountries.filter(country =>
                    country.name.common.includes(currentQuery))
                if (filteredCountries.length === 1) {
                    setSelectedCountry(filteredCountries[0])
                }
                setCountries(filteredCountries)
            })

    }

    const search = (event) => {
        event.preventDefault()
        setSelectedCountry(null)
        setCountries([])
        searchCountry(query)
    }

    return (
        <div>
            <form onSubmit={search}>
                <p>{'find countries'}</p>
                <input value={query} onChange={(event) => { setQuery(event.target.value) }} />
                <button type="submit">search</button>
            </form>
            
            {countries.length > 10
                ? <p>Too many matches, specify another filter</p>
                : countries.length !== 1 && countries.map(country =>
                    <div>
                        <p>{country.name.common}</p>
                        <button onClick={() => setSelectedCountry(country)}>{'show'}</button>
                    </div>
                )
            }

            {selectedCountry &&
                <ContryDetails country={selectedCountry} />
            }

        </div>
    )
}

const ContryDetails = (props) => {
    const name = props.country.name.common
    const capital = props.country.capital[0]
    const population = props.country.population
    const languages = []
    for (const property in props.country.languages) {
        languages.push(props.country.languages[property])
    }
    debugger
    const flag = props.country.flags.svg

    return (
        <div>
            <h2>{name}</h2>
            <p>{`capital ${capital}`}</p>
            <p>{`population ${population}`}</p>
            <h2>{'languages'}</h2>
            <ul>
                {languages.map(language => <li>{language}</li>)}
            </ul>
            <img src={flag} />
        </div>
    )
}

export default App6