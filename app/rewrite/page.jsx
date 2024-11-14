"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const JokePage = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8888/.netlify/functions/rewrite", {
        message,
      });
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
