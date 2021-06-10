import React from "react";
import { Link } from "react-router-dom";
import PokeName from "./pokemon.json";
import "./ListPokemon.css";

function ListPokemon(props) {
  return (
    <Link
      to={`/pokemon/${props.name.toLowerCase()}/${Number(
        PokeName.indexOf(props.name) + 1
      )}`}
    >
      <li
        className="Listpokemon"
        /* onClick={() =>
          props.displayPokemon(props.url, props.name.toLowerCase())
        } */
      >
        <img src={props.img} alt={props.name} />
        {props.name}
      </li>
    </Link>
  );
}

export default ListPokemon;
