import React from "react";
import axios from "axios";
import { useState } from "react";

//setup Frontend
function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [result, setResult] = useState(null);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:5000/shorten", {
        url: longUrl,
      });
      setResult(res.data);
      alert("short url created successfully")
    } catch (error) {
      alert("error in creating short url");
    }
  };

  const handleGetAndRedirect = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/shorten/${shortCode}`
      );
      window.location.href = res.data.url;
    } catch (error) {
      alert("short url not found");
    }
  };

  return (
    <>
      <h1>Create Short URL</h1>
      <input
        type="text"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="enter long url"
      />
      <button onClick={handleCreate}>Create shortUrl</button>
      {result && (
        <div>
          <h2>Original url:</h2>
          <p>{result.url}</p>
          <h2>Short URL:</h2>
          <p>{result.shortCode}</p>
        </div>
      )}

      <h1>Retrieve And Redirect</h1>
      <input type="text"
      value={shortCode}
      onChange={(e) => setShortCode(e.target.value)}
      placeholder="enter short code "
      />
      <button onClick={handleGetAndRedirect}>Get Url And Redirect</button>
    </>
  );
}

export default App;
