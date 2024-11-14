const { GoogleGenerativeAI } = require("@google/generative-ai");
const crypto = require("crypto");

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

// Secret key for generating the hash
const REWRITE_API_INIT_KEY = "71461b1ffda00442ecc98e3bf0d972cd";

// Function to generate hash
const generateHash = (datetime) => {
  return crypto.createHash("sha256").update(`${REWRITE_API_INIT_KEY}${datetime}69`).digest("hex");
};

exports.handler = async (event) => {
  const origin = event.headers.origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (!origin || !isAllowedOrigin) {
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
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
      },
    };
  }

  // Validate the hash from the client
  const requestBody = JSON.parse(event.body || "{}");
  const clientHash = event.headers["x-api-key"];
  const datetime = requestBody.datetime;

  if (!datetime || !clientHash) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing datetime or API key in request." }),
    };
  }

  const serverHash = generateHash(datetime);
  if (clientHash !== serverHash) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "Invalid API key." }),
    };
  }

  // Process POST request
  try {
    const userMessage = requestBody.message || "Hello! How can I assist you today?";
    const result = await model.generateContent(userMessage);
    const responseContent = result?.response?.text() || "No response generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseContent }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
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
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-API-Key",
      },
    };
  }
};
