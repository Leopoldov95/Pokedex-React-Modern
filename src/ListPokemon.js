import React from "react";
import { Link } from "react-router-dom";
import PokeName from "./pokemon.json";
import "./ListPokemon.css";

function ListPokemon(props) {
  return (
    <Link
      to={`pokemon/${Number(PokeName.indexOf(props.name) + 1)}/${props.name}`}
    >
      <li
        className="Listpokemon"
        onClick={() =>
          props.displayPokemon(props.url, props.name.toLowerCase())
        }
      >
        <img src={props.img} alt={props.name} />
        {props.name}
      </li>
    </Link>
  );
}

export default ListPokemon;
