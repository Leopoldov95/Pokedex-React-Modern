import React, { Component } from "react";
import "./Pokenav.css";
import Autocomplete from "./Autocomplete";
import logo from "./pokeball.png";

class Pokenav extends Component {
  static defaultProps = {
    limit: [151, 251, 386, 493, 649, 721, 809, 898],
  };
  constructor(props) {
    super(props);
    this.handleMenuBtn = this.handleMenuBtn.bind(this);
  }

  handleMenuBtn() {
    const x = document.querySelector(".myLinks");
    x.classList.toggle("menu-active");
  }

  render() {
    let render = this.props.displayPokemon;
    let limit = this.props.limit;
    return (
      <div className="Pokenav">
        <div className="Pokenav-nav">
          <div className="Pokenav-nav-top">
            <div>
              <h1>Pokedex</h1>
            </div>

            <div className="Pokenav-Autocomplete">
              <Autocomplete displayPokemon={this.props.handleInfo} />
              <img className="Pokenav-logo" src={logo} alt="pokeball_icon" />
            </div>
            <div className="mobile-menu">
              <div className="topnav">
                <a className="mobile-active" href="#home">
                  {" "}
                </a>
                <a
                  className="icon"
                  href="#"
                  id="mobile"
                  onClick={this.handleMenuBtn}
                >
                  <i className="fa fa-bars"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="Pokenav-nav-bottom">
            <ul className="myLinks">
              <li onClick={() => render(0, limit[7])}>All</li>
              <li onClick={() => render(0, limit[0])}>Gen 1</li>
              <li onClick={() => render(limit[0], limit[1])}>Gen 2</li>
              <li onClick={() => render(limit[1], limit[2])}>Gen 3</li>
              <li onClick={() => render(limit[2], limit[3])}>Gen 4</li>
              <li onClick={() => render(limit[3], limit[4])}>Gen 5</li>
              <li onClick={() => render(limit[4], limit[5])}>Gen 6</li>
              <li onClick={() => render(limit[5], limit[6])}>Gen 7</li>
              <li onClick={() => render(limit[6], limit[7])}>Gen 8</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokenav;
