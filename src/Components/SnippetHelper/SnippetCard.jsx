import React from 'react';
import { colorGenerator } from '../../js/color.js';
import { Link } from 'react-router';
import '../../Styles/SnippetCard.css';

export default function SnippetCard({ snippet }) {
  return (
    <Link to={`/view/${snippet.id}`} className="snippet-card-link">
      <div className="snippet-card">
        <div className="snippet-card-content">
          <h1 className="snippet-title">{snippet.title}</h1>
          <h1 className="snippet-language" style={{ color: colorGenerator() }}>{snippet.language}</h1>
          <h2 className="snippet-user">Created by: {snippet.user}</h2>
        </div>
      </div>
    </Link>
  );
}