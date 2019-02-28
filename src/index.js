import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { IMAGE, TIME_DURATION } from "./constants";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "./styles.scss";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNext, setIsNext] = useState(true);

  const src = IMAGE[currentIndex];
  const len = IMAGE.length;

  useEffect(() => {
    const timer = setTimeout(() =>
      setCurrentIndex(prevIndex => (prevIndex + 1 + len) % len)
    , TIME_DURATION);
    return () => clearTimeout(timer);
  }, [currentIndex])

  function handlerPrev(e) {
    e.preventDefault();
    setIsNext(false);
    setCurrentIndex(prevIndex => (prevIndex - 1 + len) % len);
  }

  function handlerNext(e) {
    e.preventDefault();
    setIsNext(true);
    setCurrentIndex(prevIndex => (prevIndex + 1) % len);
  }

  function changeSlide(id) {
    return function(e) {
      e.preventDefault();
      setCurrentIndex(id);
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
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="carousel_slide" key={currentIndex}>
            <img src={src} alt="carousel slide" />
          </div>
        </ReactCSSTransitionGroup>
        <div className="carousel_control carousel_control__prev">
          <span onClick={handlerPrev} />
        </div>
        <div className="carousel_control carousel_control__next">
          <span onClick={handlerNext} />
        </div>
        <div className="carousel_history">
          <ul>
            {IMAGE.map((item, id) => {
              const name = (currentIndex === id && "active") || "";
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
