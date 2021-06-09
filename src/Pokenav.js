import React from "react";
import { Link } from "react-router-dom";
import "./Pokenav.css";
import Autocomplete from "./Autocomplete";
import logo from "./pokeball.png";

function Pokenav(props) {
  const limit = [151, 251, 386, 493, 649, 721, 809, 898];

  const handleMenuBtn = () => {
    const x = document.querySelector(".myLinks");
    x.classList.toggle("menu-active");
  };

  let render = props.displayPokemon;

  return (
    <div className="Pokenav">
      <div className="Pokenav-nav">
        <div className="Pokenav-nav-top">
          <div>
            <h1>Pokedex</h1>
          </div>

          <div className="Pokenav-Autocomplete">
            <Autocomplete displayPokemon={props.handleInfo} />
            <img className="Pokenav-logo" src={logo} alt="pokeball_icon" />
          </div>
          <div className="mobile-menu">
            <div className="topnav">
              <a className="mobile-active" href="#home">
                {" "}
              </a>
              <a className="icon" href="#" id="mobile" onClick={handleMenuBtn}>
                <i className="fa fa-bars"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="Pokenav-nav-bottom">
          <ul className="myLinks">
            <Link to="/">
              <li onClick={() => render(898, 0)}>All</li>
            </Link>

            <Link to="/">
              <li onClick={() => render(151, 0)}>Gen 1</li>
            </Link>

            <Link to="/">
              <li onClick={() => render(100, 151)}>Gen 2</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(135, 251)}>Gen 3</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(107, 386)}>Gen 4</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(156, 493)}>Gen 5</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(72, 649)}>Gen 6</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(88, 721)}>Gen 7</li>
            </Link>
            <Link to="/">
              <li onClick={() => render(89, 809)}>Gen 8</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pokenav;
