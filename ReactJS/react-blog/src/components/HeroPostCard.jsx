import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

function HeroPostCard({ post }) {
  const [errorImages, setErrorImages] = useState({});

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };
  return (
    <Link className="non-link" to={`blog/${post._id}`}>
      <div className="popular-posts">
        <LazyLoadImage
          width={"100%"}
          height={"318px"}
          style={{ objectFit: "cover" }}
          effect="blur"
          onError={() => handleImageError(post._id)}
          src={
            errorImages[post._id]
              ? "https://savlatbek-coder.netlify.app/images/me.jpg"
              : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                  post.photo._id
                }.${post.photo.name.split(".")[1]}`
          }
        />
        <div className="post-body">
          <p className="hero-detail my-2">
            By{" "}
            <span className="text-yellow">
              {post.user
                ? post.user.first_name + " " + post.user.last_name
                : "Savlatbek"}
              {}
            </span>{" "}
            |{" "}
            {new Date(
              post?.category
                ? post.category.updatedAt
                : "2009-07-11T00:00:00.000Z"
            ).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="post-title">
            {post?.category ? post.category.name : "Coding"},{" "}
            {post?.category
              ? post.category.description.slice(0, 36)
              : "Lorem ipsum dolor sit amet consectetur ad"}
          </h1>
          <p className="post-descr">
            {post?.category
              ? post.category.description
              : "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default HeroPostCard;
