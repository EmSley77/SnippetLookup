import React from 'react';
import { Link } from 'react-router';
import '../../styles/homecard.css';

export default function HomeCard({ snippet }) {

  return (

    <Link to={`/view/${snippet.id}`} className="snippet-card-link">
      <div className="card">
        <div className="main-content">
          <div className="header">
            <span>{snippet.title.toUpperCase()}</span>
          </div>
          <p className="heading">{snippet.description.toUpperCase()}</p>
          <div className="categories">
            <span>{snippet.language}</span>
          </div>
        </div>
        <div className="card-footer">
          @{snippet.username}
        </div>
      </div>
    </Link>


  );
}