import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [getBlogStatus, changeGetBlogStatus] = useState({ success: null, blogs: [] });

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch('/api/blog/all', { method: 'GET' });
        const data = await res.json();
        changeGetBlogStatus(data);
      } catch (error) {
        console.log('error', error.message);
        changeGetBlogStatus({ success: false, blogs: [] });
      }
    };

    getBlogs();
  }, []);

  return (
    <div className="container my-5">
      {getBlogStatus.success === false && (
        <div className="alert alert-danger" role="alert">
          Unable to fetch blogs! Please try again later.
        </div>
      )}

      <div className="row g-4">
        {getBlogStatus.success &&
          getBlogStatus.blogs.map((blog) => (
            <div key={blog._id} className="col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost:8000${blog.coverImageURL}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{blog.title}</h5>
                  <div className="mt-auto">
                    <Link to={`/blog/${blog._id}`} className="btn btn-primary w-100">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
