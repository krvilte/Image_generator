import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (prompt) => {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "a white siamese cat",
      n: 1,
      size: "1024x1024",
    });
    console.log(response);
    return response.data[0].url;
  } catch (error) {
    console.log(error.message);
  }
};
