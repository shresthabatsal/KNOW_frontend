import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import HorizontalArticleItem from '../components/HorizontalArticleItem';
import './Saved.css';

const Saved = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSavedArticles = async () => {
      if (user) {
        try {
          const response = await api.get('/saved/saved');
          const articlesWithFormattedDate = response.data.savedArticles.map((saved) => ({
            ...saved.Article,
            formattedDate: new Date(saved.Article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }));
          setSavedArticles(articlesWithFormattedDate);
        } catch (error) {
          console.error('Failed to fetch saved articles:', error);
        }
      }
    };

    fetchSavedArticles();
  }, [user]);

  return (
    <div className="saved-container">
      <h2>Saved</h2>
      <div className="saved-articles-list">
        {savedArticles.length > 0 ? (
          savedArticles.map((article) => (
            <HorizontalArticleItem key={article.articleId} article={article} />
          ))
        ) : (
          <p>No saved articles found.</p>
        )}
      </div>
    </div>
  );
};

export default Saved;
