import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Articles.css";
import Layout from "../components/AuthorLayout/AuthorLayout";

const Articles = () => {
  return (
    <Layout>
      <div className="articles-container">
        
      </div>
    </Layout>
  );
};

export default Articles;