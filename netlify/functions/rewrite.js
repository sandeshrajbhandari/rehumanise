const {
  HarmCategory,
  HarmBlockThreshold,
  VertexAI,
} = require("@google-cloud/vertexai");
const { auth } = require("google-auth-library");

// Load service account key from environment variable
const serviceAccountKey = JSON.parse(process.env.GCP_SERVICE_ACCOUNT_KEY);

// Create a client using the service account key
const client = auth.fromJSON(serviceAccountKey);
console.log(client);
client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];

const project = process.env.PROJECT_ID || "test-api-sandesh";
const location = process.env.REGION || "us-central1";
const textModel = "gemini-1.5-flash-002";

const vertexAI = new VertexAI({
  project,
  location,
  credentials: client,
});

console.log("Vertex AI initialized");
// console.log(vertexAI);

// Instantiate the Gemini model with safety settings
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 256 },
  systemInstruction: {
    role: "system",
    parts: [{ text: "You are a helpful assistant providing information." }],
  },
});

// Handler function to integrate with Netlify
exports.handler = async (event) => {
  try {
    // Parse input content from the request body
    const requestBody = JSON.parse(event.body);
    const userMessage =
      requestBody.message || "Hello! How can I assist you today?";

    // Prepare the content generation request
    const request = {
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
    };

    // Generate content using the Gemini model
    const result = await generativeModel.generateContent(request);
    const responseContent = result.response.candidates[0].content.parts[0].text;

    // Return only the text of the model's response
    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseContent }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error generating content:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to generate content",
        details: error.message,
      }),
    };
  }
};
