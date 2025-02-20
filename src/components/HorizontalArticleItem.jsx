import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HorizontalArticleItem.css';

const HorizontalArticleItem = ({ article }) => {
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
    <div className="horizontal-article-item" onClick={handleClick}>
      {/* Cover Image */}
      <div className="horizontal-cover-image-container">
        <img
          src={`http://localhost:4000/uploads/${article.cover_image}`}
          alt={article.title}
          className="horizontal-cover-image"
        />
      </div>

      {/* Content */}
      <div className="horizontal-content">
        {/* Category and Date */}
        <div className="horizontal-meta-info">
          <div className="horizontal-category-box">{article.category}</div>
          <div className="horizontal-published-date">{formattedDate}</div>
        </div>

        {/* Title and Summary */}
        <h3 className="horizontal-title">{article.title}</h3>
        <p className="horizontal-summary">{article.summary}</p>
      </div>
    </div>
  );
};

export default HorizontalArticleItem;