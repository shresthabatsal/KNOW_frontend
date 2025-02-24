import React, { useEffect, useState } from "react";
import "./Travel.css";
import api from "../services/api";
import ArticleItem from "../components/ArticleItem/ArticleItem";

const Travel = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/category/Travel');
        const publishedArticles = response.data.filter(
          (article) => article.status === 'Published'
        );
        setArticles(publishedArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="travel-container">
      <div className="articles-grid">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default Travel;