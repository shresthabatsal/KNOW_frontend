import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import DOMPurify from 'dompurify';
import { useAuth } from '../context/AuthContext';
import './NewsPage.css';

const NewsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active
  const { user } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id}`);
        setArticle(response.data);
        if (user) {
          const savedResponse = await api.get('/saved/saved');
          const savedArticles = savedResponse.data.savedArticles;
          setIsSaved(savedArticles.some(saved => saved.articleId === response.data.id));

          // Track article view for logged-in users
          await trackArticleView();
        }
      } catch (error) {
        console.error('Failed to fetch article:', error);
      }
    };

    const trackArticleView = async () => {
      try {
        await api.post(`/articles/${id}/view`);
      } catch (error) {
        console.error('Failed to track article view:', error);
      }
    };

    fetchArticle();
  }, [id, user]);

  // Cleanup function to stop speech when the component unmounts
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel(); // Stop speech when the component unmounts
      }
    };
  }, []);

  const handleSave = async () => {
    if (!user) {
      alert('Please login to save articles');
      return;
    }

    try {
      if (isSaved) {
        await api.delete('/saved/unsave', { data: { articleId: article.id } });
        setIsSaved(false);
      } else {
        await api.post('/saved/save', { articleId: article.id });
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to save/unsave article:', error);
    }
  };

  const handleListen = () => {
    if (!article) return;

    // Extract text from the title and content
    const contentElement = document.createElement('div');
    contentElement.innerHTML = DOMPurify.sanitize(article.content);
    const contentText = contentElement.textContent || contentElement.innerText;
    const text = `${article.title}. ${contentText}`; // Combine title and content

    // Check if the browser supports the Web Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US'; // Set the language
      utterance.rate = 1; // Speed of speech (1 is normal)
      utterance.pitch = 1; // Pitch of speech (1 is normal)

      // Event listener to detect when speech ends
      utterance.onend = () => {
        setIsSpeaking(false); // Reset the button to "Listen"
      };

      // Start speech
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true); // Set the button to "Stop"
    } else {
      alert('Sorry, your browser does not support text-to-speech.');
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // Stop speech
      setIsSpeaking(false); // Reset the button to "Listen"
    }
  };

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
            <button className="save-button" onClick={handleSave}>
              {isSaved ? 'Saved' : 'Save'}
            </button>
            {isSpeaking ? (
              <button className="stop-button" onClick={handleStop}>
                Stop
              </button>
            ) : (
              <button className="listen-button" onClick={handleListen}>
                Listen
              </button>
            )}
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
            <div key={index} className="tag">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;