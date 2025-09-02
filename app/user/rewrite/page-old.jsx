"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import crypto from "crypto";

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

const REWRITE_API_INIT_KEY = "71461b1ffda00442ecc98e3bf0d972cd";

const RewritePage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to create the hash
  const generateApiKey = (datetime) => {
    return crypto
      .createHash("sha256")
      .update(`${REWRITE_API_INIT_KEY}${datetime}69`)
      .digest("hex");
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Generate datetime and API key hash
      const datetime = new Date().toISOString();
      const apiKey = generateApiKey(datetime);

      // Send the request with the datetime in the body and API key in headers
      const res = await axios.post(
        "/.netlify/functions/rewrite",
        // "https://rehumanisepro.netlify.app"
        { message, datetime },
        {
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      let markdownContent = await serialize(res.data.response)
      setResponse(markdownContent);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get a response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
      <Card>
        <CardHeader>
          <CardTitle>Paste your text here</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={handleInputChange}
            className="mb-4"
          />
          <Button onClick={handleSubmit} disabled={loading || !message}>
            {loading ? "Loading..." : "Submit"}
          </Button>
          {response && (
            <Alert className="mt-4 bg-gray-100">
              <AlertDescription>
                <MDXRemote {...response} />
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RewritePage;
