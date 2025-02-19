import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DOMPurify from 'dompurify'; // For sanitizing HTML content
import './NewsPage.css';

const NewsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div className="news-page">
      <div className="news-container">
        <h1 className="title">{article.title}</h1>
        <div className="meta-info">
          <div className="left">
            <div className="category-item">{article.category}</div>
            <div className="published-date-display">{formattedDate}</div>
            <div className="author">{article.Author.name}</div>
          </div>
          <div className="right">
            <button className="save-button">Save</button>
            <button className="listen-button">Listen</button>
          </div>
        </div>
        <img
          src={`http://localhost:4000/uploads/${article.cover_image}`}
          alt={article.title}
          className="cover-image-display"
        />
        <div
          className="content-display"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="tags">
        {article.tags.map((tag, index) => (
            <span key={index} className="tag">
            {tag}
            </span>
        ))}
        </div>

      </div>
    </div>
  );
};

export default NewsPage;