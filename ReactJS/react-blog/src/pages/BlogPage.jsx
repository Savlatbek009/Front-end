import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import request from "../server";
import BlogCard from "../components/BlogCard";

function BlogPage() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await request.get("post/" + id);
      setData([res.data]);
    } catch (error) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="container my-2">
        {data.map((el) => (
          <BlogCard key={el._id} el={el} />
        ))}
      </section>
    </>
  );
}

export default BlogPage;
