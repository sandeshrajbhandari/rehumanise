"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CopyButton from "@/components/CopyButton";
import crypto from "crypto";


import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import NeedSignIn from "@/components/NeedSignIn";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { error } from "console";

const REWRITE_API_INIT_KEY = "71461b1ffda00442ecc98e3bf0d972cd";

function REwritePage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

/*
 const { data: session, status } = useSession();
  // console.log(session);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Handle unauthenticated users
  if (status === "unauthenticated") {
    // return <p>You are not logged in. Please log in to use this feature.</p>;
    return <NeedSignIn />;
  }

  if (session.hasSub) {
    return <p>You need to subscribe</p>;
  }
*/



  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const generateApiKey = (datetime) => {
    return crypto
      .createHash("sha256")
      .update(`${REWRITE_API_INIT_KEY}${datetime}69`)
      .digest("hex");
  };

  const handleSubmit = async () => {
    setLoading(true);

   try {
      const datetime = new Date().toISOString();
      const apiKey = generateApiKey(datetime);

      /*const res = await axios.post(
        "/.netlify/functions/rewrite",
        { message, datetime },
        {
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );*/
      let markdownContent = await serialize(message)
      setResponse(markdownContent);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to get a response");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2"> {/* Removed gap-8 */}
        {/* Input Section - Left Side */}
        <div className="relative">
          <Card className="h-full shadow-md rounded-lg overflow-hidden">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-semibold text-gray-800">Input Text</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={handleInputChange}
                className="mb-4 min-h-[300px] border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md"
              />
              <Button
                onClick={handleSubmit}
                disabled={loading || !message}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md py-2 transition-colors duration-300"
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </CardContent>
          </Card>
          {/* Vertical Line Separator */}
          <div className="hidden md:block absolute top-0 right-0 h-full w-[1px] bg-gray-300 transform translate-x-1/2"></div>
        </div>

        {/* Output Section - Right Side */}
        <Card className="h-full shadow-md rounded-lg overflow-hidden">
          <CardHeader className="p-6">
            <CardTitle className="text-lg font-semibold text-gray-800">Output</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {response ? (
              <Alert className="bg-gray-50 min-h-[300px] border border-gray-200 rounded-md">
                <AlertDescription>
                  <div className="prose prose-sm max-w-none">
                    <MDXRemote {...response} />
                  </div>
        
                </AlertDescription>
              </Alert>
              
            ) : (
              <div className="min-h-[300px] flex items-center justify-center text-gray-500 italic">
                Your rewritten text will appear here
              </div>

            )}
        
            

          </CardContent>
        </Card>
      </div>
    </div>
  );
};
const RewritePage = () => {
    return (
    
        <REwritePage/>
    )

}


export default RewritePage;