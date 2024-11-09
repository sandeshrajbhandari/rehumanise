// netlify/functions/classify/classify.js
const { pipeline } = require("@huggingface/transformers");

const P = () =>
  class PipelineSingleton {
    static task = "text-classification";
    static model = "Xenova/distilbert-base-uncased-finetuned-sst-2-english";
    static instance = null;

    static async getInstance(progress_callback = null) {
      if (this.instance === null) {
        this.instance = pipeline(this.task, this.model, { progress_callback });
      }
      return this.instance;
    }
  };

let PipelineSingleton = P();

exports.handler = async (event, context) => {
  const text = event.queryStringParameters?.text;
  if (!text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing text parameter" }),
    };
  }

  try {
    const classifier = await PipelineSingleton.getInstance();
    const result = await classifier(text);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Classification failed",
        details: error.message,
      }),
    };
  }
};
