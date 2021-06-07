import React from "react";
import "./ListPokemon.css";

function ListPokemon(props) {
  return (
    <li
      className="Listpokemon"
      onClick={() => props.displayPokemon(props.url, props.name.toLowerCase())}
    >
      <img src={props.img} alt={props.name} />
      {props.name}
    </li>
  );
}

export default ListPokemon;
