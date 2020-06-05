import React from "react";
import "normalize.css";
import Container from "./components/container";

const description =
  "Technically Yoga is the spirit front end of three who love yoga, tech, and Marina Del Rey. Click away and discover a quote that makes your horoscope jealous. A Technically Yoga generated quote is guaranteed to either awaken your soul, give cognitive unease, brighten your Darshan or bring understanding to that mildly depressed itch in the back of your head. This is where your Karma and Meta Elements link to bring you a moment of ease. Or, create your own quote and give Rumi a run for his shakti. You can save a Technically Yoga quote and share with a friend.";

const App = () => {
  return (
    <div className="App">
      <Container description={description} />
    </div>
  );
};

export default App;
