"use client";
import React, { useState } from "react";

function DetectAI() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    console.log("Environment Variables:", process.env);
    console.log(`Bearer ${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_AUTH_TOKEN}`);
    try {
      const res = await fetch(
        "https://us-central1-test-api-sandesh.cloudfunctions.net/detect-ai",
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUD_FUNCTION_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: "Hello World" }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Detection</h1>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Call API"}
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default DetectAI;
