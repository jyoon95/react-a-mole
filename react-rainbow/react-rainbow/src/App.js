import React, { useState } from "react";
import "./App.css";
import ColorBlock from "./components/ColorBlock";
import ColorForm from "./components/ColorForm";

function App() {
  let [colors, setColors] = useState([
    "violet",
    "blue",
    "lightblue",
    "green",
    "greenyellow",
    "yellow",
    "orange",
    "red",
  ]);

  const addColor = (newColor) => {
    setColors([...colors, newColor]);
  };

  let colorMap = colors.map((color, i) => {
    return <ColorBlock key={i} color={color} />;
  });

  return (
    <div className="App">
      <div>{colorMap}</div>
      <ColorForm addColor={addColor} />
    </div>
  );
}

export default App;
