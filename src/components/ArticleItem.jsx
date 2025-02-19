import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleItem.css';

const ArticleItem = ({ article }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${article.id}`);
  };

  const formattedDate = new Date(article.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="article-item-news" onClick={handleClick}>
      {/* Cover Image */}
      <img
        src={`http://localhost:4000/uploads/${article.cover_image}`}
        alt={article.title}
        className="cover-image-item"
      />

      {/* Category and Published Date */}
      <div className="meta-info-item">
        <div className="category-box-item">{article.category}</div>
        <div className="published-date-item">{formattedDate}</div>
      </div>

      {/* Title and Summary */}
      <h3 className="title-item">{article.title}</h3>
      <p className="summary">{article.summary}</p>
    </div>
  );
};

export default ArticleItem;