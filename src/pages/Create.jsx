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
            <MenuItem value="World">World</MenuItem>
            <MenuItem value="Politics">Politics</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Sports">Sports</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Environment">Environment</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Entertainment">Entertainment</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
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
            {/* World Tags */}
            <MenuItem value="Global News">Global News</MenuItem>
            <MenuItem value="International Relations">International Relations</MenuItem>
            <MenuItem value="Conflict Zones">Conflict Zones</MenuItem>
            <MenuItem value="Diplomacy">Diplomacy</MenuItem>
            <MenuItem value="Humanitarian Issues">Humanitarian Issues</MenuItem>

            {/* Politics Tags */}
            <MenuItem value="Elections">Elections</MenuItem>
            <MenuItem value="Government Policies">Government Policies</MenuItem>
            <MenuItem value="Political Parties">Political Parties</MenuItem>
            <MenuItem value="Public Opinion">Public Opinion</MenuItem>
            <MenuItem value="Legislation">Legislation</MenuItem>

            {/* Business Tags */}
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Markets">Markets</MenuItem>
            <MenuItem value="Startups">Startups</MenuItem>
            <MenuItem value="Corporate News">Corporate News</MenuItem>
            <MenuItem value="Trade">Trade</MenuItem>

            {/* Sports Tags */}
            <MenuItem value="Football">Football</MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Cricket">Cricket</MenuItem>
            <MenuItem value="Olympics">Olympics</MenuItem>
            <MenuItem value="Athletics">Athletics</MenuItem>

            {/* Health Tags */}
            <MenuItem value="Fitness">Fitness</MenuItem>
            <MenuItem value="Mental Health">Mental Health</MenuItem>
            <MenuItem value="Nutrition">Nutrition</MenuItem>
            <MenuItem value="Medical Breakthroughs">Medical Breakthroughs</MenuItem>
            <MenuItem value="Public Health">Public Health</MenuItem>

            {/* Environment Tags */}
            <MenuItem value="Climate Change">Climate Change</MenuItem>
            <MenuItem value="Conservation">Conservation</MenuItem>
            <MenuItem value="Renewable Energy">Renewable Energy</MenuItem>
            <MenuItem value="Pollution">Pollution</MenuItem>
            <MenuItem value="Sustainability">Sustainability</MenuItem>

            {/* Travel Tags */}
            <MenuItem value="Destinations">Destinations</MenuItem>
            <MenuItem value="Travel Tips">Travel Tips</MenuItem>
            <MenuItem value="Adventure Travel">Adventure Travel</MenuItem>
            <MenuItem value="Cultural Experiences">Cultural Experiences</MenuItem>
            <MenuItem value="Travel News">Travel News</MenuItem>

            {/* Entertainment Tags */}
            <MenuItem value="Movies">Movies</MenuItem>
            <MenuItem value="Music">Music</MenuItem>
            <MenuItem value="Celebrity News">Celebrity News</MenuItem>
            <MenuItem value="TV Shows">TV Shows</MenuItem>
            <MenuItem value="Pop Culture">Pop Culture</MenuItem>

            {/* Science Tags */}
            <MenuItem value="Space Exploration">Space Exploration</MenuItem>
            <MenuItem value="Technology Innovations">Technology Innovations</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Scientific Discoveries">Scientific Discoveries</MenuItem>
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