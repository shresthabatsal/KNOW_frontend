import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "/src/components/AuthorLayout/AuthorLayout";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Analytics.css";

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Ensure the user is logged in and has an ID
        if (!user || !user.id) {
          throw new Error("You must be logged in to view analytics.");
        }

        // Fetch analytics data from the backend
        const response = await api.get(`/authors/${user.id}/analytics`);
        setAnalytics(response.data);
      } catch (err) {
        setError("Failed to fetch analytics data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]); // Re-fetch analytics if the user changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Layout>
      <div className="analytics-container">
        <h1>Author Analytics</h1>
        {analytics ? (
          <div className="analytics-data">
            <div className="metric">
              <h2>Total Publishes</h2>
              <p>{analytics.totalArticles}</p>
            </div>
            <div className="metric">
              <h2>Total Views</h2>
              <p>{analytics.totalViews}</p>
            </div>
            <div className="metric">
              <h2>Total Saves</h2>
              <p>{analytics.totalSaves}</p>
            </div>
          </div>
        ) : (
          <p>No analytics data available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Analytics;