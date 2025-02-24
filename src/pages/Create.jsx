import React, { useState } from "react";
import Layout from "/src/components/AuthorLayout/AuthorLayout";
import { TextField, Button, Chip, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS
import "./Create.css";
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Create = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const { user } = useAuth();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const handleSubmit = async (status) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('summary', summary);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('tags', tags);
    formData.append('status', status);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      const response = await api.post('/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      if (response.data) {
        alert(`Article ${status === 'Draft' ? 'saved as draft' : 'published'} successfully!`);
        // Redirect or clear form
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert(`Failed to ${status === 'Draft' ? 'save as draft' : 'publish'} article`);
    }
  };

  return (
    <Layout>
      <div className="create-container">
        <h2>Create a New Article</h2>

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
          <Select value={category} onChange={handleCategoryChange} label="Category">
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
          </Select>
        </FormControl>

        {/* Content Input - Replaced with ReactQuill */}
        <div className="content-section">
          <label className="content-label">Content</label>
          <ReactQuill
            theme="snow" // Use the "snow" theme for the editor
            value={content}
            onChange={setContent} // Update the content state
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
            onChange={handleTagsChange}
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
          <button className="draft-btn" onClick={() => handleSubmit("Draft")}>
            Save as Draft
          </button>
          <button className="post-btn" onClick={() => handleSubmit("Published")}>
            Post
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Create;