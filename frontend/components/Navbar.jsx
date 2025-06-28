import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [loginStatus, changeLoginStatus] = useState({ success: false });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkauth = async () => {
      const res = await fetch('/api/user/check-auth', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      changeLoginStatus(data);
    };
    checkauth();
  }, [location]);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        changeLoginStatus({ success: false });
        navigate('/');
      }
    } catch (error) {
      console.log('Logout error:', error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Blogify</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {loginStatus.success ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog/add">Add Blog</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-primary fw-semibold">
                    Welcome {loginStatus.user?.name || 'User'}!
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/signUp">Create Account</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
