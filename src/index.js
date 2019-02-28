import React, { useState } from "react";
import ReactDOM from "react-dom";
import { IMAGE } from "./constants";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./styles.scss";

function App() {
  const [imageArray] = useState(IMAGE);
  const [index, setIndex] = useState(0);
  const [isNext, setIsNext] = useState(true);

  const src = imageArray[index];
  const len = imageArray.length;

  function handlerPrev(e) {
    e.preventDefault();
    setIsNext(false);
    setIndex(prevIndex => (prevIndex - 1 + len) % len);
  }

  function handlerNext(e) {
    e.preventDefault();
    setIsNext(true);
    setIndex(prevIndex => (prevIndex + 1) % len);
  }

  function changeSlide(id) {
    return function(e) {
      e.preventDefault();
      setIndex(id);
    }
  }

  return (
    <div className="app">
      <div className="carousel">
        <ReactCSSTransitionGroup
          transitionName={{
            enter: isNext ? "enter-next" : "enter-prev",
            enterActive: "enter-active",
            leave: "leave",
            leaveActive: isNext ? "leave-active-next" : "leave-active-prev"
          }}
        >
          <div className="carousel_slide" key={index}>
            <img src={src} alt="carousel slide" />
          </div>
        </ReactCSSTransitionGroup>
        <div className="carousel_control carousel_control__prev" onClick={handlerPrev}>
          <span />
        </div>
        <div className="carousel_control carousel_control__next" onClick={handlerNext}>
          <span />
        </div>
        <div className="carousel_history">
          <ul>
            {imageArray.map((item, id) => {
              const name = (index === id && "active") || "";
              return (
                <li key={id} onClick={changeSlide(id)}>
                  <button className={name} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
