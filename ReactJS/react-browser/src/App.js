import React, { useState } from "react";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

const App = () => {
  const [value, setValue] = useState("");
  const [valueY, setValueY] = useState("");
  const handleWrite = (e) => {
    setValue(e.target.value);
  };
  const handleWriteY = (e) => {
    setValueY(e.target.value);
  };
  const link = `https://www.google.com/search?q=${value}`;
  const linkY = `https://yandex.com/search/?text=${valueY}`;
  return (
    <>
      <Header />
      <div className="content">
        <br /> <br />
        <div className="container">
          <div className="row">
            <div className="col-md-6 browser col-12">
              <img
                style={{ width: "30px", height: "30px" }}
                src="https://play-lh.googleusercontent.com/6UgEjh8Xuts4nwdWzTnWH8QtLuHqRMUB7dp24JYVE2xcYzq4HA8hFfcAbU-R-PC_9uA1"
                alt=""
              />
              <span>oogle</span>
              <div className="clr"></div>
              <br />
              <div className="search">
                <input
                  type="search"
                  placeholder="search..."
                  onChange={handleWrite}
                  value={value}
                  className="input"
                />
                <a href={link} target="_blank" className="btn-search">
                  search
                </a>
              </div>
              <h3 className="value">Value: {value}</h3>
            </div>
            <div className="col-md-6 browser col-12">
              <img
                style={{ width: "30px", height: "30px" }}
                src="https://yastatic.net/s3/home-static/_/90/9034470dfcb0bea0db29a281007b8a38.png"
                alt=""
              />
              <span>andex</span>
              <div className="clr"></div>
              <br />
              <div className="search">
                <input
                  type="search"
                  placeholder="search..."
                  onChange={handleWriteY}
                  className="input"
                  value={valueY}
                />
                <a target="_blank" href={linkY} className="btn-search">
                  search
                </a>
              </div>
              <h3 className="value">Value: {valueY}</h3>
            </div>
          </div>
        </div>
        <br /> <br />
      </div>
      <Footer />
    </>
  );
};

export default App;
