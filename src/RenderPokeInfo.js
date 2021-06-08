import React from "react";
import Pokeinfo from "./Pokeinfo";
import uuid from "uuid/dist/v4";
import PokeJSON from "./pokemon.json";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";

function RenderPokeInfo(props) {
  const currentPokemon = props.currentPokemon;
  return (
    <div>
      <div className="Pokedex-info-container">
        <div className="Pokedex-header">
          <div className="Pokedex-cntrl">
            <div
              className="Pokedex-prev"
              onClick={() =>
                PokeJSON[
                  Number(
                    currentPokemon.varData[0].url
                      .replace("https://pokeapi.co/api/v2/pokemon/", "")
                      .replace("/", "")
                  ) - 2
                ] !== undefined &&
                props.handleInfo(
                  `${API_URl}${Number(
                    currentPokemon.species.url.split("/")[6] - 1
                  )}/`,
                  Number(currentPokemon.species.url.split("/")[6] - 1)
                )
              }
            >
              <i className="fas fa-angle-left"></i>
            </div>
            <span>
              {PokeJSON[
                Number(
                  currentPokemon.varData[0].url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "")
                ) - 2
              ] === undefined
                ? ""
                : PokeJSON[
                    Number(
                      currentPokemon.varData[0].url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", "")
                    ) - 2
                  ]}
            </span>
          </div>

          <div className="Pokedex-dropdown">
            <div className="Pokedex-dropdown-menu">
              <span>
                {currentPokemon.name[0][0].toUpperCase() +
                  currentPokemon.name.substring(1)}
              </span>
              <i
                className=" menu-toggle fas fa-angle-down"
                onClick={props.handleMenuBtn}
              ></i>
              {/* forms={currentPokemon.varData} */}
            </div>
            <div className="Pokedex-dropdown-items">
              <ul>
                {currentPokemon.varData.map((form) => (
                  <li
                    key={form.name}
                    onClick={() =>
                      props.handleInfo(form.url, form.name.split("-")[0])
                    }
                  >
                    {form.name[0].toUpperCase() + form.name.substring(1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="Pokedex-cntrl">
            <span>
              {PokeJSON[
                Number(
                  currentPokemon.varData[0].url
                    .replace("https://pokeapi.co/api/v2/pokemon/", "")
                    .replace("/", "")
                )
              ] === undefined
                ? ""
                : PokeJSON[
                    Number(
                      currentPokemon.varData[0].url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", "")
                    )
                  ]}
            </span>
            <div
              className="Pokedex-next"
              onClick={() =>
                PokeJSON[
                  Number(
                    currentPokemon.varData[0].url
                      .replace("https://pokeapi.co/api/v2/pokemon/", "")
                      .replace("/", "")
                  )
                ] !== undefined &&
                props.handleInfo(
                  `${API_URl}${
                    Number(currentPokemon.species.url.split("/")[6]) + 1
                  }/`,
                  Number(currentPokemon.species.url.split("/")[6]) + 1
                )
              }
            >
              <i className="fas fa-angle-right"></i>
            </div>
          </div>
        </div>
        {/*    <Pokename
                name={currentPokemon.name}
                varieties={currentPokemon.varData}
                handleInfo={this.handleInfo}
                id={currentPokemon.id}
                key={uuid()}
                img={currentPokemon.sprites.front_default}
              />
 */}
        <Pokeinfo
          img={currentPokemon.sprites.front_default}
          types={currentPokemon.types}
          name={currentPokemon.name}
          weight={currentPokemon.weight}
          height={currentPokemon.height}
          abilities={currentPokemon.abilities}
          id={currentPokemon.id}
          key={uuid()}
          stats={currentPokemon.stats}
          forms={currentPokemon.varData}
          species={currentPokemon.species}
          desc={currentPokemon.desc}
          evolution={currentPokemon.evolution_chain}
          handleInfo={props.handleInfo}
        />
      </div>
    </div>
  );
}

export default RenderPokeInfo;
