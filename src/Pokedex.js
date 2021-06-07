import React, { Component } from "react";
import axios from "axios";

import Pokecard from "./Pokecard";

import RenderPokeInfo from "./RenderPokeInfo";

import TypeInfo from "./types.json";

import Pokenav from "./Pokenav";
import "./Pokedex.css";
import "./media.css";

const API_URl = "https://pokeapi.co/api/v2/pokemon/";
const IMG_URL = "https://img.pokemondb.net/sprites/home/normal/";
const POKE_FORMS = "https://pokeapi.co/api/v2/pokemon-species/";

class Pokedex extends Component {
  static defaultProps = {
    default: 151,
  };
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [], // all pokemon will be stored here
      loading: false,
      displayPokedex: true,
      currPokemon: [],
    };
    this.displayPokemon = this.displayPokemon.bind(this);
    this.getPokemon = this.getPokemon.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.getForms = this.getForms.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.closeAutocomplete = this.closeAutocomplete.bind(this);
    this.handleMenuBtn = this.handleMenuBtn.bind(this);
  }

  componentDidMount() {
    // just want to generate intial display here
    this.getPokemon(0, this.props.default);
  }

  async getPokemon(start, end) {
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
      this.setState((st) => ({
        loading: false,
        displayPokedex: true,
        pokemon: [...st.pokemon, ...pokemon],
      }));
    } catch (err) {
      alert(err);
    }
  }

  displayPokemon(start, end) {
    this.setState({ pokemon: [] });

    this.getPokemon(start, end);
    if (document.querySelector(".myLinks").classList.contains("menu-active")) {
      document.querySelector(".myLinks").classList.remove("menu-active");
    }
  }

  handleMenuBtn() {
    const x = document.querySelector(".menu-toggle");
    x.classList.toggle(".active");
    if (x.classList.contains(".active")) {
      document.querySelector(".Pokedex-dropdown-items ").style.display =
        "block";
    } else {
      document.querySelector(".Pokedex-dropdown-items ").style.display = "none";
    }
  }

  closeFormSel() {
    if (document.querySelector(".Pokedex-dropdown-items")) {
      document.querySelector(".Pokedex-dropdown-items").style.display = "none";
    }
  }

  closeAutocomplete() {
    if (document.querySelector(".Autocomplete-list")) {
      document.querySelector(".Autocomplete-list").style.display = "none";
      document.querySelector(".form-text").value = "";
    }
  }

  async getPokeInfo(url) {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (err) {
      alert(err);
    }
  }

  async getForms(forms) {
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
  }

  async handleInfo(info, speciesURL) {
    this.closeAutocomplete();
    this.closeFormSel();
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
    } = await this.getPokeInfo(info);

    // left off here, handle the addtional information!
    let { varData, desc, evolution_chain } = await this.getForms(speciesURL);

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
    this.setState({
      displayPokedex: false,
      currPokemon: data,
    });
  }

  handleInput(e) {
    if (
      e.target.className !== "Autocomplete" ||
      e.target.className !== "Listpokemon"
    ) {
      this.closeAutocomplete();
    }
  }

  render() {
    let generatePokemon = this.state.pokemon.map((p) => (
      <Pokecard
        handleInfo={() => this.handleInfo(p.info, p.id)}
        type={TypeInfo[p.id - 1]}
        name={p.name}
        info={p.info}
        id={p.id}
        img={p.img}
        key={p.id}
      />
    ));

    let currentPokemon = this.state.currPokemon[0];

    return (
      <div className="Pokedex" onClick={this.handleInput}>
        <Pokenav
          displayPokemon={this.displayPokemon}
          handleInfo={this.handleInfo}
        />

        {this.state.displayPokedex ? (
          <div>
            {/*   <img src="./pokemon-types/bug.png" /> */}
            <div className="Pokedex-pokemon">{generatePokemon}</div>
          </div>
        ) : (
          <RenderPokeInfo
            handleMenuBtn={this.handleMenuBtn}
            handleInfo={this.handleInfo}
            currentPokemon={currentPokemon}
          />
        )}
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
    );
  }
}

export default Pokedex;
