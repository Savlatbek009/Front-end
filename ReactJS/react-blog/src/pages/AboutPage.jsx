import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function AboutPage() {
  return (
    <section className="about-sec">
      <div className="container">
        <div className="about-header" style={{ background: "#f4f0f8" }}>
          <div className="col-1">
            <p className="about-header-title">Our mision</p>
            <h1 className="about-header-content">
              Creating valuable content for creatives all around the world
            </h1>
            <p className="about-header-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
          <br />
          <br />
          <div className="col-2">
            <p className="about-header-title">Our Version</p>
            <h1 className="about-header-content">
              A platform that empowers individuals to improve
            </h1>
            <p className="about-header-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
              blandit massa enim nec. Scelerisque viverra mauris in aliquam sem.
              At risus viverra adipiscing at in tellus.
            </p>
          </div>
        </div>
        <div className="about-header">
          <div className="col-1">
            <h1 className="about-header-content">Our team of creatives</h1>
            <h3 className="about-header-mini-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p className="about-header-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
          <div className="col-2">
            <LazyLoadImage
              effect="blur"
              style={{ width: "100%" }}
              src="https://images.pexels.com/photos/461049/pexels-photo-461049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
        </div>
        <div className="about-header">
          <div className="col-1">
            <LazyLoadImage
              effect="blur"
              style={{ width: "100%" }}
              src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </div>
          <div className="col-2">
            <h1 className="about-header-content">Why we started this Blog</h1>
            <h3 className="about-header-mini-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </h3>
            <p className="about-header-descr">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
