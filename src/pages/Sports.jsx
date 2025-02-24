import React, { useEffect, useState } from "react";
import "./Sports.css";
import api from "../services/api";
import ArticleItem from "../components/ArticleItem";

const Sports = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/articles/category/Sports');
        // Filter articles to include only those with status "Published"
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
    <div className="sports-container">
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Sports;
