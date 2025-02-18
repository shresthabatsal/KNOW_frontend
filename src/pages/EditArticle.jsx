import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Chip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from "../components/AuthorLayout/AuthorLayout";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Create.css";

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [status, setStatus] = useState("draft");

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/articles/${id}`);
      const article = response.data;
      setTitle(article.title);
      setSummary(article.summary);
      setCategory(article.category);
      setTags(article.tags);
      setContent(article.content);
      setStatus(article.status);
      setCoverPreview(`http://localhost:4000/uploads/${article.cover_image}`);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  const handleSubmit = async (e, newStatus) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('status', newStatus);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      const response = await api.put(`/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.data) {
        alert('Article updated successfully!');
        navigate('/articles');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Failed to update article');
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Layout>
      <div className="create-container">
        <h2>Edit Article</h2>
        <form onSubmit={(e) => handleSubmit(e, status)}>
          {/* Title Input */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />

          {/* Cover Image Upload */}
          <div className="cover-image-container">
            <label className="cover-label">Cover Image</label>
            <div className="cover-box">
              {coverPreview ? (
                <img src={coverPreview} alt="Cover Preview" className="cover-preview" />
              ) : (
                <p>Choose an image</p>
              )}
            </div>
            <input type="file" accept="image/*" onChange={handleCoverImageChange} />
          </div>

          {/* Summary Input */}
          <TextField
            label="Summary"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            margin="normal"
          />

          {/* Category Selection */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
            </Select>
          </FormControl>

          {/* Content Input */}
          <div className="content-section">
            <label className="content-label">Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              style={{ height: "300px", marginBottom: "40px" }}
            />
          </div>

          {/* Tags Selection */}
          <div className="tags-section">
            <label className="tags-label">Tags</label>
            <Select
              multiple
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} style={{ margin: "2px" }} />
                  ))}
                </div>
              )}
              fullWidth
              margin="normal"
            >
              <MenuItem value="React">React</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="buttons">
            {status === "Draft" ? (
              <>
                <button type="button" className="draft-btn" onClick={(e) => handleSubmit(e, "Draft")}>
                  Save as Draft
                </button>
                <button type="button" className="post-btn" onClick={(e) => handleSubmit(e, "Published")}>
                  Post
                </button>
              </>
            ) : (
              <button type="submit" className="post-btn">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditArticle;