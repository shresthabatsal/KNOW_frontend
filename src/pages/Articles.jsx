import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Articles.css";
import Layout from "../components/AuthorLayout/AuthorLayout";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    try {
      const response = await api.get(`/articles/author/${user.id}`);
      // Sort articles by updatedAt (most recently updated first)
      const sortedArticles = response.data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-article/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await api.delete(`/articles/${id}`);
        fetchArticles(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="articles-container">
        <h2>Your Articles</h2>
        {articles.length === 0 ? (
          <div className="no-articles">No articles found.</div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="article-item">
              {/* Cover Image */}
              {article.cover_image && (
                <img
                  src={`http://localhost:4000/uploads/${article.cover_image}`}
                  alt="Cover"
                  className="cover-image"
                />
              )}

              {/* Article Details */}
              <div className="article-details">
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <div className="category-box">{article.category}</div>
                <div className="status-box">{article.status}</div>
              </div>

              {/* Actions */}
              <div className="actions">
                <button onClick={() => handleEdit(article.id)}>
                  <img src="./src/assets/edit.png" alt="Edit" />
                </button>
                <button onClick={() => handleDelete(article.id)}>
                  <img src="./src/assets/delete.png" alt="Delete" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Articles;