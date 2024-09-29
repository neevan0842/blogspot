import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlertContext from "../context/alert/AlertContext";
import { Container, Card, Button } from "react-bootstrap";
import { timeAgo } from "../utility";
import api from "../api";
import "../styles/BlogDetail.css";
import Comment from "../components/Comment";

const BlogDetail = () => {
  const { postId } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const { showAlert } = useContext(AlertContext);

  const getBlogDetails = async () => {
    try {
      const res = await api.get(`/api/posts/${postId}/`);
      if (res.status === 200) {
        setBlog(res.data);
        setComments(res.data.comments);
        // console.log(blog);
      } else {
        showAlert("something went wrong!", "danger");
      }
    } catch (error) {
      showAlert("something went wrong!", "danger");
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
    // console.log(blog);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="blog-page">
        <header className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">
            <span className="blog-author">By {blog.owner}</span>
            <span className="blog-date">{timeAgo(blog.created)}</span>
          </div>
        </header>
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.body }}
        ></article>
        {
          <Comment
            postId={postId}
            name={"Comments"}
            comments={comments}
            setComments={setComments}
          />
        }
      </div>
      {/* <Comment postId={postId} comments={comment} /> */}
    </>
  );
};

export default BlogDetail;
