import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pokeinfo from "./Pokeinfo";
import axios from "axios";
import PokeJSON from "./pokemon.json";
import NoPage from "./NoPage";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";

function RenderPokeInfo(props) {
  const [currPokemon, setCurrPokemon] = useState([]);
  const [success, setSuccess] = useState(true);
  useEffect(() => {
    let isCancelled = false;
    window.scrollTo(0, 0);
    if (!isCancelled) {
      handleInfo(props.match.params.id);
    }

    return () => {
      isCancelled = true;
    };
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo(0, 0);
    handleInfo(props.match.params.id);
  }, [props]); // eslint-disable-next-line react-hooks/exhaustive-deps

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
      let res = await axios.get(`${API_URl}${url}/`);
      return res.data;
    } catch (err) {
      setSuccess(false);
    }
  };

  const getForms = async (url) => {
    let varData = [];
    let desc;
    let res = await axios.get(url);
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
  const handleInfo = async (pokeId) => {
    try {
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

      let { varData, desc, evolution_chain } = await getForms(species.url);

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

      setCurrPokemon(data);
    } catch (err) {
      setSuccess(false);
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
  if (success) {
    return (
      <div>
        {currPokemon < 1 ? (
          <div>
            <img
              src="/poke-ball.png"
              alt="pokeball_loader"
              className="Pokedex-loader"
            />
            <h2>Loading... </h2>
          </div>
        ) : (
          <div className="Pokedex-info-container">
            <div className="Pokedex-header">
              <div className="Pokedex-cntrl">
                <Link
                  to={`/pokemon/${
                    Number(
                      currPokemon[0].species.url
                        .replace(
                          "https://pokeapi.co/api/v2/pokemon-species/",
                          ""
                        )
                        .replace("/", "")
                    ) - 1
                  }`}
                >
                  <div className="Pokedex-prev">
                    <i className="fas fa-angle-left"></i>
                  </div>
                </Link>
                <span>
                  {PokeJSON[
                    Number(
                      currPokemon[0].species.url
                        .replace(
                          "https://pokeapi.co/api/v2/pokemon-species/",
                          ""
                        )
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
                        key={form.name}
                        to={`/pokemon/${Number(
                          form.url
                            .replace("https://pokeapi.co/api/v2/pokemon/", "")
                            .replace("/", "")
                        )}`}
                      >
                        <li className="Pokedex-dropdown-li" key={form.name}>
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
                        .replace(
                          "https://pokeapi.co/api/v2/pokemon-species/",
                          ""
                        )
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
                  to={`/pokemon/${
                    Number(
                      currPokemon[0].species.url
                        .replace(
                          "https://pokeapi.co/api/v2/pokemon-species/",
                          ""
                        )
                        .replace("/", "")
                    ) + 1
                  }`}
                >
                  <div className="Pokedex-next">
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
              stats={currPokemon[0].stats}
              forms={currPokemon[0].varData}
              species={currPokemon[0].species}
              desc={currPokemon[0].desc}
              evolution={currPokemon[0].evolution_chain}
            />
          </div>
        )}
      </div>
    );
  } else {
    return <NoPage />;
  }
}

export default RenderPokeInfo;
