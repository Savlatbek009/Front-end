import React, { Fragment, useEffect, useState } from "react";

import request from "../server";
import { toast } from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CategoryCard from "../components/CategoryCard";
import { Link } from "react-router-dom";
import HeroPostCard from "../components/HeroPostCard";

function HomePage() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [heroBg, setHeroBg] = useState("");
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const res = await request.get("post/lastone");
      setData([res.data]);
      setHeroBg(`https://savlatbek-coder.netlify.app/images/me.jpg`);
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  }

  async function getPosts() {
    try {
      setLoading(true);
      const res = await request.get("post/lastones");
      setPosts(res.data);
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  }

  async function getCategory() {
    try {
      setLoading(true);
      const res = await request.get("category");
      setCategory(res.data.data);
    } catch (error) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    getPosts();
    getCategory();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  return (
    <>
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero">
          <div className="container">
            {loading ? (
              <h3 className="err-loading">Loading...</h3>
            ) : (
              data.map((el) => (
                <Fragment key={el._id}>
                  <p className="hero-category">
                    Posted on <b>{el.category ? el.category.name : "CODING"}</b>
                  </p>
                  <h1 className="hero-title">
                    {el.category
                      ? el.category.name + el.category.description.slice(0, 36)
                      : "Coding, Lorem ipsun dollot sit, if you wont get up nd wake!"}
                  </h1>
                  <p className="hero-detail">
                    By{" "}
                    <span className="text-yellow">
                      {el.user.first_name} {el.user.last_name}
                    </span>{" "}
                    |{" "}
                    {new Date(
                      el.category
                        ? el.category.updatedAt
                        : "2009-07-11T00:00:00.000Z"
                    ).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="hero-descr">
                    {el.category
                      ? el.category.description
                      : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}
                  </p>
                  <Link to={"/blog/" + el._id} className="btn btn-yellow">
                    Read More {">"}
                  </Link>
                </Fragment>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="container">
        <h1 className="section-title">Most Popular</h1>
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : (
          <Carousel
            responsive={responsive}
            showDots={false}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={100}
            keyBoardControl={true}
          >
            {posts.map((post) => (
              <HeroPostCard key={post._id} post={post} />
            ))}
          </Carousel>
        )}
      </section>
      <br />
      <br />
      <div className="container">
        <hr />
      </div>
      <section className="category-sec container">
        <center>
          <h1 className="section-title">Choose A Catagory</h1>
        </center>
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : (
          <Carousel
            responsive={responsive}
            showDots={false}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={100}
            keyBoardControl={true}
          >
            {category.map((el) => (
              <CategoryCard key={el._id} el={el} />
            ))}
          </Carousel>
        )}
      </section>
      <br />
      <br />
    </>
  );
}

export default HomePage;
