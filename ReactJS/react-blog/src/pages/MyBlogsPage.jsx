import React, { useEffect, useState } from "react";
import request from "../server";
import { toast } from "react-toastify";
import PostCard from "../components/PostCard";

function MyBlogsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({});

  async function getPosts(page) {
    try {
      setLoading(true);
      const res = await request.get(`post/user?page=${page}&limit=5`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found bro");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const maxPage = Math.ceil(totalPost / 5);

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
      const res = await request.get(`post/user?search=${e.target.value}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(e) {
    const dateNow = new Date();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      updatedAt: dateNow,
      createdAt: dateNow,
    });
    console.log(values);
  }

  async function upLoadImage(e) {
    try {
      let form = new FormData();
      form.append("file", e.target.files[0]);
      let { data } = await request.post("upload", form);
      setValues({ ...values, photo: data });
      console.log(values);
    } catch (err) {
      toast.error("Server Error");
    }
  }

  const deleteFunc = async (e, id) => {
    e.preventDefault();
    const del = window.confirm("Do you won't to delete this Item");
    if (del) {
      await request.delete("post/" + id);
      getPosts(currentPage);
    }
  };

  async function handleOk(e) {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(values);
      const res = await request.post("post", values);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
      getPosts(currentPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts(currentPage);
  }, [currentPage]);

  return (
    <section>
      <div className={isModalOpen ? "showModal modal" : "modal"}>
        <div className="modal-body">
          <form onSubmit={handleOk}>
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="title"
              placeholder="Post Title"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="category"
              placeholder="Post Category"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="description"
              placeholder="Post Description"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="tags"
              placeholder="Post Tags"
            />
            <input className="modal-input" onChange={upLoadImage} type="file" />
            <div className="modal-action">
              <button className="modal-btn-danger" onClick={handleCancel}>
                Close
              </button>
              <button className="modal-btn-success" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="container">
        <br />
        <input
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        <div className="my-posts-header">
          <h1 className="section-title">My Posts ({totalPost})</h1>
          <button onClick={showModal} className="btn-yellow">
            Add Post
          </button>
        </div>
        <hr />
        <br />

        {loading ? (
          <h3 className="err-loading">Loading...</h3>
        ) : posts.length ? (
          posts.map((post) => (
            <div onContextMenu={(e) => deleteFunc(e, post._id)}>
              <PostCard key={post._id} post={post} />
            </div>
          ))
        ) : (
          <h3 className="err-not-found">Not Found!</h3>
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
              {"Next >"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default MyBlogsPage;
