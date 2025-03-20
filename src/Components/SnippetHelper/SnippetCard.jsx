import React from 'react';
import { Link } from 'react-router';
import '../../Styles/SnippetCard.css';

export default function SnippetCard({ snippet }) {
  return (
    <Link to={`/view/${snippet.id}`} className="snippet-card-link">
      <div className="card">
        <div className="main-content">
          <div className="header">
            <span>{snippet.title}</span>
          </div>
          <p className="heading">{snippet.description}</p>
          <div className="categories">
            <span>{snippet.language}</span>
          </div>
        </div>
        <div className="card-footer">
          by {snippet.user}
        </div>
      </div>
    </Link>
  );
}