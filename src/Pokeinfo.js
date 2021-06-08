import React, { useState, useEffect } from "react";
import axios from "axios";
import PokeList from "./pokemon.json";
import "./Pokeinfo.css";

const POKE_IMG =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const SPRITE_IMG = "https://img.pokemondb.net/sprites/home/normal/";
const SPRITE_ALT =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function Pokeinfo(props) {
  const [stageZero, setStageZero] = useState([]);
  const [stageOne, setStageOne] = useState([]);
  const [stageTwo, setStageTwo] = useState([]);

  useEffect(() => {
    const handleEvoData = async (url) => {
      try {
        const evoArr = [];
        const basic = [];
        const stageOne = [];
        const stageTwo = [];
        const res = await axios.get(url.url);
        const evoData = res.data.chain;
        // there are maximum 3 stages of evolution

        // this will alwasy push base form
        basic.push(evoData.species);
        if (evoData.evolves_to.length > 0) {
          for (let form of evoData.evolves_to) {
            // pushing all stage one pokemon to stageOne
            stageOne.push(form.species);
          }
          if (evoData.evolves_to[0].evolves_to.length > 0) {
            for (let form of evoData.evolves_to[0].evolves_to) {
              // pushing all stage two pokemon to stagetwo
              stageTwo.push(form.species);
            }
          }
        }

        evoArr.push(basic, stageOne, stageTwo);
        setStageZero([...basic]);
        setStageOne([...stageOne]);
        setStageTwo([...stageTwo]);
      } catch (err) {
        alert(err);
      }
    };
    handleEvoData(props.evolution);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const padToThree = (num) => {
    return num <= 999 ? `00${num}`.slice(-3) : num;
  };

  const handleStats = (num) => {
    if (num > 180) {
      return 100;
    } else {
      return (num + 20) / 2;
    }
  };

  const typeColor = (name) => {
    switch (name) {
      case "fire":
        return "red";
      case "grass":
        return "green";
      case "water":
        return "blue";
      case "ice":
        return "teal";
      case "ground":
        return "burlywood";
      case "rock":
        return "brown";
      case "dragon":
        return "darkslateblue";
      case "fairy":
        return "pink";
      case "fighting":
        return "crimson";
      case "dark":
        return "black";
      case "ghost":
        return "indigo";
      case "psychic":
        return "purple";
      case "bug":
        return "olive";
      case "poison":
        return "darkmagenta";
      case "normal":
        return "grey";
      case "steel":
        return "silver";
      case "electric":
        return "gold";
      case "flying":
        return "lightblue";
      default:
        return "white";
    }
  };

  const progressColor = (perc) => {
    if (perc < 21) {
      return "red";
    } else if (perc < 41) {
      return "orangered";
    } else if (perc < 61) {
      return "yellow";
    } else if (perc < 75) {
      return "yellowgreen";
    } else if (perc < 88) {
      return "rgb(0, 175, 0)";
    } else {
      return "turquoise";
    }
  };

  const calcBST = () => {
    const init = 0;
    const reducer = (total, curr) => {
      return total + curr.base_stat;
    };
    return props.stats.reduce(reducer, init);
  };

  const generateEvoCard = (data) => {
    return data.map((evo) => (
      <div
        key={evo.name}
        className="Pokeinfo-card"
        onClick={() =>
          props.handleInfo(
            `https://pokeapi.co/api/v2/pokemon/${
              PokeList.indexOf(
                evo.name[0].toUpperCase() + evo.name.substring(1)
              ) + 1
            }`,
            evo.name
          )
        }
      >
        <img
          src={`${SPRITE_IMG}${evo.name}.png`}
          alt={evo.name}
          onError={(e) => {
            e.target.src = `${SPRITE_ALT}${
              PokeList.indexOf(
                evo.name[0].toUpperCase() + evo.name.substring(1)
              ) + 1
            }.png`;
          }}
        />
        <span>{evo.name[0].toUpperCase() + evo.name.substring(1)}</span>
      </div>
    ));
  };

  //console.log(PokeList.indexOf("Bulbasaur") + 1);
  const generateAbilities = props.abilities.map((a) => (
    <li key={a.ability.name}>{a.ability.name}</li>
  ));

  const evoZero = generateEvoCard(stageZero);
  const evoOne = generateEvoCard(stageOne);
  const evoTwo = generateEvoCard(stageTwo);

  const statName = ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"];
  let generateStats = props.stats.map((s) => (
    <div
      className="Pokeinfo-stat-container"
      key={statName[props.stats.indexOf(s)]}
    >
      <div>{statName[props.stats.indexOf(s)]}:</div>
      <div className="progress">
        <div
          className="progress-done"
          style={{
            width: `${handleStats(s.base_stat)}%`,
            opacity: 1,
            backgroundColor: `${progressColor(handleStats(s.base_stat))}`,
          }}
        >
          {s.base_stat}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="Pokeinfo">
      <div className="Pokeinfo-top">
        <div>
          <img
            src={`${POKE_IMG}${props.id}.png`}
            alt={`${props.name}_img`}
            onError={(e) => {
              e.target.src = `${SPRITE_ALT}${props.id}.png`;
            }}
          />
        </div>
        <div className="Pokeinfo-info">
          <div>
            <h2 className="Pokeinfo-info-name">
              {props.name[0].toUpperCase() + props.name.substring(1)}
            </h2>
          </div>
          <div>
            <h2>Pokedex No.</h2>
            <p>{padToThree(props.species.url.split("/")[6])}</p>
          </div>
          <div>
            <h2>Type:</h2>
            {props.types.length === 1 ? (
              <span
                className="Pokeinfo-type"
                style={{
                  backgroundColor: `${typeColor(props.types[0].type.name)}`,
                }}
              >
                {props.types[0].type.name}
              </span>
            ) : (
              <div>
                <span
                  className="Pokeinfo-type"
                  style={{
                    backgroundColor: `${typeColor(props.types[0].type.name)}`,
                  }}
                >
                  {props.types[0].type.name}
                </span>
                <span
                  className="Pokeinfo-type"
                  style={{
                    backgroundColor: `${typeColor(props.types[1].type.name)}`,
                  }}
                >
                  {props.types[1].type.name}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2>Weight:</h2>
            <p>{props.weight / 10}kg</p>
          </div>
          <div>
            <h2>Height:</h2>
            <p>{props.height / 10}m</p>
          </div>
          <div>
            <h2>Abilities:</h2>
            <ul>{generateAbilities}</ul>
          </div>
        </div>
        <div className="Pokeinfo-desc">
          <h2>Pokedex Info</h2>
          <div>
            <p>{props.desc.replace(/(?:\f)/g, " ")}</p>
          </div>
        </div>
      </div>
      <div className="Pokeinfo-bottom">
        <div className="Pokeinfo-stats">
          {generateStats}
          <p>
            BST: <span style={{ fontWeight: "bold" }}>{calcBST()}</span>
          </p>
        </div>

        <div>
          <h2>Evolution</h2>
          <div>
            {evoZero}
            {evoOne.length > 0 && <i className="fas fa-chevron-right"></i>}
            {evoOne}
            {evoTwo.length > 0 && <i className="fas fa-chevron-right"></i>}
            {evoTwo}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pokeinfo;
