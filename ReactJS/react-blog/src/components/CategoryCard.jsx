import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const CategoryCard = ({ el }) => {
  const [errorImages, setErrorImages] = useState({});

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };
  return (
    <Link className="non-link" to={`/category/${el._id}?name=${el.name}`}>
      <div className="category">
        <LazyLoadImage
          width={"100%"}
          height={"300px"}
          effect="blur"
          style={{ objectFit: "cover" }}
          onError={() => handleImageError(el._id)}
          src={
            errorImages[el._id]
              ? "https://savlatbek-coder.netlify.app/images/me.jpg"
              : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                  el.photo._id
                }.${el.photo.name.split(".")[1]}`
          }
        />
        <div className="category-body">
          <h3 className="category-title">{el.name}</h3>
          <h3 className="post-descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga cum ad
            culpa officia.
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
