import { Moon, Search } from "lucide-react";
import "./App.scss";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [paises, setPaises] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("DEFAULT");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://restcountries.com/v3.1/all"
      );
      const data = await response.json();
      setPaises(data);
    }

    fetchData();
  }, []);

  const filteredCountries = useMemo(() => {
    return paises.filter((pais) => {
      const matchesSearch = pais.name.common.toLowerCase().includes(searchCountry.toLowerCase());
      const matchesRegion = selectedRegion === "DEFAULT" || pais.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [paises, searchCountry, selectedRegion]);

  return (
    <div className="container">
      <header className="cabecalho_Container">
        <h1>Where in the world?</h1>
      </header>
      <section>
        <div>
          <div className="inputSearch">
            <Search />
            <input
              type="text"
              value={searchCountry}
              onChange={(e) => setSearchCountry(e.target.value)}
              className=""
              placeholder="Search for a country..."
            />
          </div>

          <select
            name="regions"
            id="regions"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="DEFAULT">Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        <div className="cardsContainer">
          {filteredCountries.map((pais) => (
            <div className="card" key={pais.cca3}>
              <img src={pais.flags.png} alt={`Flag of ${pais.name.common}`} />
              <div className="infosCards">
                <h3>{pais.name.common}</h3>
                <p>
                  Population: <span>{pais.population.toLocaleString('de-DE')}</span>
                </p>
                <p>
                  Region: <span>{pais.region}</span>
                </p>
                <p>
                  Capital: <span>{pais.capital ? pais.capital.join(", ") : "N/A"}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
