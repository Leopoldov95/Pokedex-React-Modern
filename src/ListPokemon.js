import React from "react";
import { Link } from "react-router-dom";
import PokeName from "./pokemon.json";
import "./ListPokemon.css";

function ListPokemon(props) {
  return (
    <Link to={`/pokemon/${Number(PokeName.indexOf(props.name) + 1)}`}>
      <li className="Listpokemon">
        <img src={props.img} alt={props.name} />
        {props.name}
      </li>
    </Link>
  );
}

export default ListPokemon;
