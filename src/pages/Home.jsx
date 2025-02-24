import React, { useEffect, useState } from "react";
import "./Home.css";
import api from "../services/api";
import ArticleItem from "../components/ArticleItem/ArticleItem";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (user) {
          console.log('Fetching personalized articles for user:', user.id); // Debugging
          response = await api.get('/articles/personalized');
        } else {
          console.log('Fetching all published articles for non-logged-in user'); // Debugging
          response = await api.get('/articles');
        }

        console.log('Response:', response.data); // Debugging

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
  }, [user]);

  return (
    <div className="home-container">
      <div className="articles-grid">
        {articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home;