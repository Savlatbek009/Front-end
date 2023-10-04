import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BlogCard({ el }) {
  const [errorImages, setErrorImages] = useState({});

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };

  return (
    <div className="blog">
      <LazyLoadImage
        width={"100%"}
        height={"582px"}
        style={{ objectFit: "cover", objectPosition: "top" }}
        effect="blur"
        onError={() => handleImageError(el._id)}
        src={
          errorImages[el._id]
            ? "https://savlatbek-coder.netlify.app/images/me.jpg"
            : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                el.photo._id
              }.${el.photo.name.split(".")[1]}`
        }
      />
      <br />
      <div className="blog-content">
        <div className="author">
          <LazyLoadImage
            width={"50px"}
            height={"50px"}
            style={{ borderRadius: "50%" }}
            onError={() => handleImageError(el._id)}
            src={
              errorImages[el._id]
                ? "https://savlatbek-coder.netlify.app/images/me.jpg"
                : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                    el.photo._id
                  }.${el.photo.name.split(".")[1]}`
            }
            effect="blur"
          />
          <div>
            <h3 className="author-name">
              {el.user
                ? el.user.first_name + " " + el.user.last_name
                : "Abdullayev Savlatbek"}
            </h3>
            <p>
              Posted on{" "}
              {new Date(
                el.category ? el.category.updatedAt : "2009-07-11T00:00:00.000Z"
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <h1 className="hero-title" style={{ maxWidth: "none" }}>
          {el.category ? el.category.name : "Coder"},{" "}
          {el ? el.title.slice(0, 30) : "Lorem ipsum dolor sit amet con."}
        </h1>
        <h3 className="post-title">
          {el.category ? el.category.name : "Coder"} (#
          {el.tags[0]})
        </h3>
        <br />
        <p className="post-descr">
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
          ,{" "}
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
        </p>
        <br />
        <p className="post-descr">
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
          .{" "}
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
          .{" "}
          {el.category
            ? el.category.description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, pariatur magnam officiis nesciunt quis molestias eveniet provident sit! Minima, voluptas!"}
        </p>
      </div>
      <br />
      <br />
    </div>
  );
}

export default BlogCard;
