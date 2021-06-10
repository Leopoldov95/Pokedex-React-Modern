import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import uuid from "uuid/dist/v4";
import PokeJSON from "./pokemon.json";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

function RenderPokeInfo(props) {
  // may want to put handleMenuBtn here

  const [currPokemon, setCurrPokemon] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleInfo(props.match.params.name, props.match.params.id);
    console.log("I was executed at main render");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    handleInfo(props.match.params.name, props.match.params.id);
  }, [props]);

  /* useEffect(() => {
    console.log("i was executed as a side effect");
    handleInfo(`${API_URl}${props.match.params.id}`, props.match.params.name);
    window.scrollTo(0, 0);
  }, [currPokemon]); */

  //const currentPokemon = props.currentPokemon;
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
  const getPokeInfo = async (url) => {
    try {
      let res = await axios.get(`${API_URl}${url}`);
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
  const handleInfo = async (pokeName, pokeId) => {
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
    } = await getPokeInfo(pokeId);

    // left off here, handle the addtional information!
    let { varData, desc, evolution_chain } = await getForms(pokeName);

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
    //console.log(data);
    setCurrPokemon(data); // set this first otherwise it will crash the app

    //setDisplayPokedex(false);
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

  console.log(currPokemon[0]);
  return (
    <div>
      {currPokemon < 1 ? (
        <h1>Still Loading...</h1>
      ) : (
        <div className="Pokedex-info-container">
          <div className="Pokedex-header">
            <div className="Pokedex-cntrl">
              <Link
                to={`/pokemon/${PokeJSON[
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  ) - 2
                ].toLowerCase()}/${
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  ) - 1
                }`}
              >
                <div
                  className="Pokedex-prev"
                  /* onClick={() =>
                  PokeJSON[
                    Number(
                      currPokemon[0].varData[0].url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", "")
                    ) - 2
                  ] !== undefined && 
                  props.handleInfo(
                    `${API_URl}${Number(
                      currPokemon[0].species.url.split("/")[6] - 1
                    )}/`,
                    Number(currPokemon[0].species.url.split("/")[6] - 1)
                  )
                } */
                >
                  <i className="fas fa-angle-left"></i>
                </div>
              </Link>
              <span>
                {PokeJSON[
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  ) - 2
                ] === undefined
                  ? ""
                  : PokeJSON[
                      Number(
                        currPokemon[0].species.url
                          .replace(
                            "https://pokeapi.co/api/v2/pokemon-species/",
                            ""
                          )
                          .replace("/", "")
                      ) - 2
                    ]}
              </span>
            </div>

            <div className="Pokedex-dropdown">
              <div className="Pokedex-dropdown-menu">
                <span>
                  {currPokemon[0].name[0][0].toUpperCase() +
                    currPokemon[0].name.substring(1)}
                </span>
                <i
                  className=" menu-toggle fas fa-angle-down"
                  onClick={handleMenuBtn}
                ></i>
              </div>
              <div className="Pokedex-dropdown-items">
                <ul className="Pokedex-dropdown-ul">
                  {currPokemon[0].varData.map((form) => (
                    <Link
                      to={`/pokemon/${currPokemon[0].name}/${Number(
                        form.url
                          .replace("https://pokeapi.co/api/v2/pokemon/", "")
                          .replace("/", "")
                      )}`}
                    >
                      <li
                        className="Pokedex-dropdown-li"
                        key={form.name}
                        /*  onClick={() =>
                        props.handleInfo(form.url, form.name.split("-")[0])
                      } */
                      >
                        {form.name[0].toUpperCase() + form.name.substring(1)}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            <div className="Pokedex-cntrl">
              <span>
                {PokeJSON[
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  )
                ] === undefined
                  ? ""
                  : PokeJSON[
                      Number(
                        currPokemon[0].species.url
                          .replace(
                            "https://pokeapi.co/api/v2/pokemon-species/",
                            ""
                          )
                          .replace("/", "")
                      )
                    ]}
              </span>
              <Link
                to={`/pokemon/${PokeJSON[
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  )
                ].toLowerCase()}/${
                  Number(
                    currPokemon[0].species.url
                      .replace("https://pokeapi.co/api/v2/pokemon-species/", "")
                      .replace("/", "")
                  ) + 1
                }`}
              >
                <div
                  className="Pokedex-next"
                  /*  onClick={() =>
                  PokeJSON[
                    Number(
                      currPokemon[0].varData[0].url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", "")
                    )
                  ] !== undefined &&
                  props.handleInfo(
                    `${API_URl}${
                      Number(currPokemon[0].species.url.split("/")[6]) + 1
                    }/`,
                    Number(currPokemon[0].species.url.split("/")[6]) + 1
                  )
                } */
                >
                  <i className="fas fa-angle-right"></i>
                </div>
              </Link>
            </div>
          </div>

          <Pokeinfo
            img={currPokemon[0].sprites.front_default}
            types={currPokemon[0].types}
            name={currPokemon[0].name}
            weight={currPokemon[0].weight}
            height={currPokemon[0].height}
            abilities={currPokemon[0].abilities}
            id={currPokemon[0].id}
            key={uuid()}
            stats={currPokemon[0].stats}
            forms={currPokemon[0].varData}
            species={currPokemon[0].species}
            desc={currPokemon[0].desc}
            evolution={currPokemon[0].evolution_chain}
            handleInfo={props.handleInfo}
          />
        </div>
      )}
    </div>
  );
}

export default RenderPokeInfo;
