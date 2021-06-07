import React, { useState } from "react";
import PokeName from "./pokemon.json";
import ListPokemon from "./ListPokemon";
import "./Autocomplete.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

function Autocomplete(props) {
  // this.state = { search: "" };
  const [search, setSearch] = useState("");
  const handleFocus = () => {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "block";
    }
  };

  const handleChange = (e) => {
    // use pokeName.indexOf(poekmon name) to get real index/id value of pokemon
    let searchTerm = document.querySelector("input").value;
    if (searchTerm.length > 1) {
      let adjustedSearch =
        searchTerm[0].toUpperCase() + searchTerm.substring(1);
      setSearch(PokeName.filter((word) => word.includes(adjustedSearch)));
    }
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "block";
    }
  };
  let displayRes;
  if (search.length >= 1) {
    displayRes = search.map((p) => (
      <ListPokemon
        key={p}
        name={p}
        displayPokemon={props.displayPokemon}
        url={`${API_URL}${PokeName.indexOf(p) + 1}/`}
        img={`${IMG_URL}${PokeName.indexOf(p) + 1}.png`}
      />
    ));
  }
  return (
    <div className="Autocomplete" onKeyUp={handleChange}>
      <form className="Autocomplete-form" autoComplete="off">
        <div className="form-border">
          <i className="fas fa-search"> </i>
          <input
            onFocus={handleFocus}
            className="form-text"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        {this.state.search.length >= 1 ? (
          <div className="Autocomplete-list ">
            <ul>{displayRes}</ul>
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Autocomplete;
