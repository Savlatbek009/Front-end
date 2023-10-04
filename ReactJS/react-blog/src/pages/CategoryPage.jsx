import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server";
import PostCard from "../components/PostCard";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const { id } = useParams();
  const [data, seData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async () => {
    console.log(id);
    try {
      setLoading(true);
      const res = await request.get(
        `post?page=${currentPage}&limit=10&category=${id}`
      );
      seData(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("server error");
    } finally {
      setLoading(false);
    }
  };

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(
        `post?search=${e.target.value}&category=${id}`
      );
      seData(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found bro");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const name = window.location.search.split("=")[1];

  return (
    <section>
      <div className="category-sec-header">
        <div className="category-sec-header-content">
          <h1 className="header-title">{name}</h1>
          <p className="header-descr">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, amet.
            Necessitatibus ea optio esse, voluptates nobis veniam cumque culpa!
            Voluptatum nihil impedit.
          </p>
          <h3 className="header-camb">
            Blog {">"} {name}
          </h3>
        </div>
      </div>
      <div className="container cat-posts">
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : data.length ? (
          data.map((post, i) => <PostCard key={i} post={post} />)
        ) : (
          <h3 className="err-not-found">Not Found</h3>
        )}
        {data.length ? (
          <div className="pagination-buttons">
            <button
              className={
                currentPage === 1
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={prevPageFunc}
            >
              {"< Prev"}
            </button>
            {Array.from({ length: maxPage }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? "pagination-button active-page"
                    : "pagination-button"
                }
              >
                {index + 1}
              </button>
            ))}
            <button
              className={
                currentPage === maxPage
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={nextPageFunc}
            >
              {"> Next"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CategoryPage;
