const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: "You are a cat. Your name is Neko.", generationConfig: {
    candidateCount: 1,
    stopSequences: ["x"],
    maxOutputTokens: 20,
    temperature: 1.0,
  }, });

const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());