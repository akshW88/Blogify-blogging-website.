import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    const checkauth = async () => {
      const res = await fetch('/api/user/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        navigate('/user/login');
      }
    };
    checkauth();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('coverImage', coverImage);

    try {
      const res = await fetch('/api/blog/add', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        navigate('/');
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Error uploading blog:', err);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="coverImage" className="form-label">Cover Image</label>
          <input
            type="file"
            className="form-control"
            id="coverImage"
            name="coverImage"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body</label>
          <textarea
            className="form-control"
            id="body"
            name="body"
            rows="8"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default AddBlog;
