import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Blog(){
  const { id } = useParams();
  const [blogStatus, setBlogStatus] = useState({success:true, data:'dummy'});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`, { method: 'GET' });
        const data = await res.json();
        setBlogStatus({ success: true, data: data.blog });
        console.log(data);
        
      } catch (error) {
        setBlogStatus({success:false, data:null})
        console.log('Fetch error:', error.message);
      }
    };

    fetchBlog();
  }, [id]);

  return (
  <div className="container my-5 d-flex justify-content-center">
    <div className="w-100" style={{ maxWidth: '720px' }}>
      {(!blogStatus.success || !blogStatus.data) && (
        <div className="alert alert-danger" role="alert">
          Unable to fetch blog! Please try again later.
        </div>
      )}

      {blogStatus.success && blogStatus.data && (
        <div className="card shadow-sm border-0">
          <img
            src={`http://localhost:8000${blogStatus.data.coverImageURL}`}
            className="card-img-top img-fluid rounded-top"
            alt={blogStatus.data.title}
            style={{ height: '400px', objectFit: 'cover', width: '100%' }}
          />
          <div className="card-body">
            <h2 className="card-title">{blogStatus.data.title}</h2>
            <hr />
            <p className="card-text mt-3" style={{ whiteSpace: 'pre-line' }}>
              {blogStatus.data.body}
            </p>
            <hr />
            { blogStatus.data.createdBy?.name && (<p className="text-muted text-end mb-0">
              Created by: <strong>{blogStatus.data.createdBy.name}</strong>
            </p>)}
          </div>
        </div>
      )}
      
    </div>
  </div>
);

};

export default Blog;
