import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getById } from '../../js/data';
import { copyCode } from '../../js/copy';
import { colorGenerator } from '../../js/color';
import checkIcon from '../../assets/check.png'
import copyIcon from '../../assets/copy.png'
import "../../Styles/snippet.css";

export default function Snippet() {
  const param = useParams();
  const [snippet, setSnippet] = useState({})
  const [isCopied, setIsCopied] = useState(false)

  //retrieve te snippetid from the url params
  console.log(param.snippetid);
  console.log(snippet);

  // if copied ||true reset after 3000 of text
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false)
      return () => clearTimeout(timer)
    }, 3000)
  }, [isCopied])


  useEffect(() => {
    const fetchById = async () => {
      const snippet = await getById(param.snippetid)
      setSnippet(snippet)
    }
    fetchById()
  }, [param.snippetid])


  return (
    <div className="container">
      <div className="snippet-box">
        <h1>{snippet.title}</h1>
        <h2 style={{ color: colorGenerator() }}>{snippet.language}</h2>
        <p className="description">Description: {snippet.description}</p>
        <p className="creator">Creator: {snippet.user}</p>
        <pre className="code-block">
          <h4>{snippet.code}</h4>
          <button onClick={() => copyCode(snippet.code, setIsCopied, isCopied)}>
            {isCopied ? (
              <img className="icon" src={checkIcon} alt="check icon" />
            ) : (
              <img className="icon" src={copyIcon} alt="copy icon" />
            )}
          </button>
        </pre>
        <Link className="return-link" to={"/"}>
          Return
        </Link>
      </div>
    </div>
  );
};

