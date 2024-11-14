const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a helpful assistant providing information.",
  generationConfig: {
    candidateCount: 1,
    maxOutputTokens: 256,
    temperature: 0.7,
    stopSequences: ["x"],
  },
});

const allowedOrigins = [
  "http://localhost:3000",
  "http://sandeshrajbhandari.com.np",
  "rehumanisepro.netlify.app",
];

exports.handler = async (event) => {
  const origin = event.headers.origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);
  if (origin == undefined || !isAllowedOrigin) {
    console.log("Send request from allowed domains only.");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Send request from allowed domains only." }),
    };
  }
  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[1],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  // Process POST request
  try {
    const requestBody = JSON.parse(event.body || "{}");
    const userMessage = requestBody.message || "Hello! How can I assist you today?";

    const result = await model.generateContent(userMessage);
    const responseContent = result?.response?.text() || "No response generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseContent }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[1],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  } catch (error) {
    console.error("Error generating content:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to generate content",
        details: error.message,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": isAllowedOrigin ? origin : allowedOrigins[1],
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};
