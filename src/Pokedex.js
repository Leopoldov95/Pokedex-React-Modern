import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Pokecard from "./Pokecard";

import RenderPokeInfo from "./RenderPokeInfo";

import TypeInfo from "./types.json";

import Pokenav from "./Pokenav";
import "./Pokedex.css";
import "./media.css";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL = "https://img.pokemondb.net/sprites/home/normal/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

function Pokedex() {
  const defaultCall = 151;
  const [pokemon, setPokemon] = useState([]);

  const [displayPokedex, setDisplayPokedex] = useState(true);

  useEffect(() => {
    getPokemon(defaultCall, 0);
  }, []);

  const getPokemon = async (start, end) => {
    try {
      let res = await axios.get(`${API_URl}?limit=${start}&offset=${end}`);

      let data = res.data.results;
      let pokemon = [];
      for (let i of data) {
        let name;
        if (i.name.includes("minior") || i.name.includes("mimikyu")) {
          name = i.name.split("-")[0];
        } else {
          name = i.name;
        }
        pokemon.push({
          name: name,
          info: i.url,
          id: Number(
            i.url
              .replace("https://pokeapi.co/api/v2/pokemon/", "")
              .replace("/", "")
          ),
          img: `${IMG_URL}${name}.png`,
        });
      }
      setDisplayPokedex(true);
      setPokemon([...pokemon]);
    } catch (err) {
      alert(err);
    }
  };

  const displayPokemon = (start, end) => {
    setPokemon([]);

    // will want to make router changes here
    getPokemon(start, end);
    if (document.querySelector(".myLinks").classList.contains("menu-active")) {
      document.querySelector(".myLinks").classList.remove("menu-active");
    }
  };
  const closeAutocomplete = () => {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "none";
      document.querySelector(".form-text").value = "";
    }
  };

  const handleInput = (e) => {
    if (
      e.target.className !== "Autocomplete" ||
      e.target.className !== "Listpokemon"
    ) {
      closeAutocomplete();
    }
  };

  let generatePokemon = pokemon.map((p) => (
    <Pokecard
      // handleInfo={() => handleInfo(p.info, p.id)}
      type={TypeInfo[p.id - 1]}
      name={p.name}
      info={p.info}
      id={p.id}
      img={p.img}
      key={p.id}
    />
  ));

  return (
    <Router>
      <div className="Pokedex" onClick={handleInput}>
        <Pokenav displayPokemon={displayPokemon} /* handleInfo={handleInfo}*/ />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <div className="Pokedex-pokemon">{generatePokemon}</div>
              </div>
            )}
          />

          <Route path="/pokemon/:name/:id" component={RenderPokeInfo} />
        </Switch>

        {/*    {displayPokedex ? (
          <div>
            <div className="Pokedex-pokemon">{generatePokemon}</div>
          </div>
        ) : (
          <RenderPokeInfo
            handleMenuBtn={handleMenuBtn}
            handleInfo={handleInfo}
            currentPokemon={currPokemon[0]}
          />
        )}
 */}
        <div className="Pokedex-footer">
          <p>
            created by{" "}
            <a href="https://github.com/Leopoldov95" target="#">
              Leopoldo Ortega
            </a>
          </p>
          <p>
            powered by{" "}
            <a href="https://pokeapi.co/" target="#">
              Pokeapi
            </a>
          </p>
        </div>
      </div>
    </Router>
  );
}

export default Pokedex;
