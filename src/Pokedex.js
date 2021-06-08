import React, { useEffect, useState, Link } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [displayPokedex, setDisplayPokedex] = useState(true);
  const [currPokemon, setCurrPokemon] = useState([]);

  useEffect(() => {
    getPokemon(0, defaultCall);
  }, []);

  const getPokemon = async (start, end) => {
    try {
      let res = await axios.get(`${API_URl}?limit=${end}`);

      let data = res.data.results;
      let pokemon = [];
      for (let i = start; i < end; i++) {
        let name;
        if (
          data[i].name.includes("minior") ||
          data[i].name.includes("mimikyu")
        ) {
          name = data[i].name.split("-")[0];
        } else {
          name = data[i].name;
        }
        pokemon.push({
          name: name,
          info: data[i].url,
          id: i + 1,
          img: `${IMG_URL}${name}.png`,
        });
      }
      setLoading(false);
      setDisplayPokedex(true);
      setPokemon([...pokemon]);
    } catch (err) {
      alert(err);
    }
  };

  const displayPokemon = (start, end) => {
    setPokemon([]);

    getPokemon(start, end);
    if (document.querySelector(".myLinks").classList.contains("menu-active")) {
      document.querySelector(".myLinks").classList.remove("menu-active");
    }
  };

  const handleMenuBtn = () => {
    const x = document.querySelector(".menu-toggle");
    x.classList.toggle(".active");
    if (x.classList.contains(".active")) {
      document.querySelector(".Pokedex-dropdown-items ").style.display =
        "block";
    } else {
      document.querySelector(".Pokedex-dropdown-items ").style.display = "none";
    }
  };

  const closeFormSel = () => {
    if (document.querySelector(".Pokedex-dropdown-items")) {
      document.querySelector(".Pokedex-dropdown-items").style.display = "none";
    }
  };

  const closeAutocomplete = () => {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "none";
      document.querySelector(".form-text").value = "";
    }
  };

  const getPokeInfo = async (url) => {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  const getForms = async (forms) => {
    let varData = [];
    let desc;
    let res = await axios.get(`${POKE_FORMS}${forms}/`);
    let { evolution_chain, flavor_text_entries, varieties } = res.data;
    for (let i of flavor_text_entries) {
      if (i.language.name === "en") {
        desc = i.flavor_text;
        break;
      }
    }

    if (varieties.length > 1) {
      for (let prop of varieties) {
        varData.push(prop.pokemon);
      }

      return { evolution_chain, desc, varData };
    }
    // these lines of code only trigger if above conditions have not been met
    varData.push(varieties[0].pokemon);
    return { evolution_chain, desc, varData };
  };

  const handleInfo = async (info, speciesURL) => {
    closeAutocomplete();
    closeFormSel();
    let data = [];
    const {
      name,
      weight,
      id,
      types,
      height,
      abilities,
      species,
      stats,
      sprites,
    } = await getPokeInfo(info);

    // left off here, handle the addtional information!
    let { varData, desc, evolution_chain } = await getForms(speciesURL);

    data.push({
      name,
      weight,
      id,
      types,
      height,
      abilities,
      stats,
      sprites,
      species,
      varData,
      desc,
      evolution_chain,
    });
    setCurrPokemon(data); // set this first otherwise it will crash the app
    setDisplayPokedex(false);
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
      handleInfo={() => handleInfo(p.info, p.id)}
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
        <Pokenav displayPokemon={displayPokemon} handleInfo={handleInfo} />

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

          <Route
            path="/pokemon"
            exact
            render={
              () => ({
                RenderPokeInfo,
              })
              /*    handleMenuBtn={handleMenuBtn}
          handleInfo={handleInfo}
          currentPokemon={currPokemon[0]} */
            }
          />
        </Switch>
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
