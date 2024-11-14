"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import crypto from "crypto";

const REWRITE_API_INIT_KEY = "71461b1ffda00442ecc98e3bf0d972cd";

const JokePage = () => {
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
        "http://localhost:8888/.netlify/functions/rewrite",
        { message, datetime },
        {
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get a response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Ask for a Joke</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={handleInputChange}
            className="mb-4"
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </Button>
          {response && (
            <Alert className="mt-4 bg-gray-100">
              <AlertDescription>{response}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JokePage;
