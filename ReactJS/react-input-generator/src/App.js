import React, { useState } from "react";
import btns from "./images/btns.png";

const App = () => {
  const [bg, setBg] = useState("255,255,255");
  const [color, setColor] = useState("0,0,0");
  const [border, setBorder] = useState("none");
  const [borderRadius, setBorderRadius] = useState("10px");
  const [outline, setOutline] = useState("blue");
  const [fontSize, setFontSize] = useState("20px");

  const handeChangeColor = (e) => {
    setColor(e.target.value);
  };
  const handeChangeBackgroundColor = (e) => {
    setBg(e.target.value);
  };
  const changeBorder = (e) => {
    setBorder(e.target.value);
  };
  const changeBorderRaadius = (e) => {
    setBorderRadius(e.target.value);
  };
  const outlineColor = (e) => {
    setOutline(e.target.value);
  };
  const changeFontSize = (e) => {
    setFontSize(e.target.value);
  };

  const styles = {
    color: color,
    background: bg,
    fontSize: fontSize,
    padding: "10px 10px",
    borderRadius: borderRadius,
    border: border,
    outlineColor: outline,
  };
  return (
    <div className="App">
      <nav>
        <h3>React Input Generator</h3>
      </nav>
      <div className="col style">
        <div className="header">
          <img src={btns} />
          <h4 style={{ textAlign: "center" }}>Style</h4>
        </div>
        <div className="styles">
          <div className="item">
            Background-Color:
            <input
              onChange={handeChangeBackgroundColor}
              value={bg}
              type="color"
            />
          </div>
          <br />
          <div className="item">
            Color:
            <input onChange={handeChangeColor} value={color} type="color" />
          </div>
          <br />
          <div className="item">
            Border: <input type="text" value={border} onInput={changeBorder} />
          </div>
          <br />
          <div className="item">
            Border-Radius:
            <input
              type="text"
              value={borderRadius}
              onInput={changeBorderRaadius}
            />
          </div>
          <br />
          <div className="item">
            Outline-Color:
            <input type="text" value={outline} onInput={outlineColor} />
          </div>
          <br />
          <div className="item">
            Font-Size:
            <input type="text" value={fontSize} onInput={changeFontSize} />
          </div>
        </div>
      </div>
      <div className="col inputs">
        <div className="header">
          <img src={btns} />
          <h4>Preview</h4>
        </div>
        <div className="input-group">
          <input
            style={styles}
            type="text"
            className="input"
            placeholder="type..."
          />
        </div>
      </div>
      <div className="col code">
        <div className="header">
          <img src={btns} />
          <h4>Code</h4>
        </div>
        <div className="codes">
          <h1>color: {color}</h1>
          <h1>background-color: {bg};</h1>
          <h1>font-size: {styles.fontSize};</h1>
          <h1>padding: {styles.padding};</h1>
          <h1>outline-color: {styles.outlineColor};</h1>
          <h1>border: {styles.border};</h1>
          <h1>border-radius: {styles.borderRadius};</h1>
        </div>
      </div>
    </div>
  );
};

export default App;
