const { GoogleGenerativeAI } = require("@google/generative-ai");

// Set API key for authentication
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a helpful assistant providing information.",
//   generationConfig: {
//     candidateCount: 1,
//     maxOutputTokens: 256,
//     temperature: 0.7,
//     stopSequences: ["x"], // Optional stop sequence
//   },
});

// Handler function for Netlify Edge
exports.handler = async (event) => {
  try {
    // Parse the request content
    const requestBody = JSON.parse(event.body);
    const userMessage = requestBody.message || "Hello! How can I assist you today?";

    // Generate a response from the model
    const result = await model.generateContent(userMessage);
    const responseContent = result.response.candidates[0].text;
    console.log(responseContent);

    // Return the response text
    return {
      statusCode: 200,
      body: JSON.stringify({ response: responseContent }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error("Error generating content:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate content", details: error.message }),
    };
  }
};
