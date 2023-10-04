import React, { useEffect, useState } from "react";
import request from "../server";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const maxDisplayPages = 3;

  async function getPosts(page) {
    try {
      setLoading(true);
      const res = await request.get(`post?page=${page}&limit=${itemsPerPage}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  const maxPage = Math.ceil(totalPost / itemsPerPage);

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

  function generatePageNumbers() {
    const pageNumbers = [];
    if (maxPage <= maxDisplayPages) {
      for (let i = 1; i <= maxPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfMaxDisplay = Math.floor(maxDisplayPages / 2);
      let startPage, endPage;
      if (currentPage <= halfMaxDisplay) {
        startPage = 1;
        endPage = maxDisplayPages;
      } else if (currentPage >= maxPage - halfMaxDisplay) {
        startPage = maxPage - maxDisplayPages + 1;
        endPage = maxPage;
      } else {
        startPage = currentPage - halfMaxDisplay;
        endPage = currentPage + halfMaxDisplay;
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  }
  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(`post?search=${e.target.value}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section>
      <div className="container">
        <br />
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="section-title">All posts ({totalPost})</h1>
        </div>
        <hr />
        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : posts.length ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <h3 className="err-not-found">Not Found</h3>
        )}
        {posts.length ? (
          <div className="pagination-buttons">
            <button
              className={
                currentPage === 1
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={prevPageFunc}
            >
              {"<<"}
            </button>
            {generatePageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={
                  currentPage === page
                    ? "pagination-button active-page"
                    : "pagination-button"
                }
              >
                {page}
              </button>
            ))}

            {maxPage > maxDisplayPages && currentPage < maxPage - 1 && (
              <span className="pagination-ellipsis">...</span>
            )}
            {maxPage > maxDisplayPages && currentPage < maxPage && (
              <button
                onClick={() => setPage(maxPage)}
                className={
                  currentPage === maxPage
                    ? "pagination-button active-page"
                    : "pagination-button"
                }
              >
                {maxPage}
              </button>
            )}
            <button
              className={
                currentPage === maxPage
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={nextPageFunc}
            >
              {">>"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default PostsPage;
