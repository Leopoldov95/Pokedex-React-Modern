import React from "react";
import { Link } from "react-router-dom";
import "./Pokecard.css";

function Pokecard(props) {
  return (
    <Link to={`/pokemon/${props.id}`}>
      <div
        className="Pokecard"
        style={{ backgroundColor: `var(--bg-${props.type[0]})` }}
      >
        <p>{props.id <= 999 ? `00${props.id}`.slice(-3) : props.id}</p>

        <div className="Pokecard-bg">
          <img src="./poke-ball.png" alt="pokeball_backgound" />
        </div>

        <img src={props.img} alt={props.name} />
        <div className="Pokecard-info">
          <span>
            {props.type.length > 1 ? (
              <div>
                <img
                  className="Pokecard-icon"
                  src={`./pokemon-types/${props.type[0]}.png`}
                  alt={props.type[0]}
                />
                <img
                  className="Pokecard-icon"
                  src={`./pokemon-types/${props.type[1]}.png`}
                  alt={props.type[1]}
                />
              </div>
            ) : (
              <img
                className="Pokecard-icon"
                src={`./pokemon-types/${props.type[0]}.png`}
                alt={props.type[0]}
              />
            )}
          </span>
          <h2>{props.name[0].toUpperCase() + props.name.substring(1)}</h2>
        </div>
      </div>
    </Link>
  );
}

export default Pokecard;
