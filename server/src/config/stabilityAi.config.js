import axios from "axios";

const generateImage = async (prompt, retryCount = 0) => {
  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4`,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        responseType: "arraybuffer", // Expect binary data
      }
    );

    if (response.status === 200) {
      // Convert binary data to base64 string for frontend use
      const base64Image = Buffer.from(response.data).toString("base64");
      const imageUrl = `data:image/png;base64,${base64Image}`;
      return imageUrl;
    } else {
      throw new Error(
        `Hugging Face API Error: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error generating image:", error.message);

    // Handle HTML response for 503 errors
    if (error.response && error.response.status === 503) {
      const htmlContent = Buffer.from(error.response.data).toString("utf-8");
      console.error("Service Unavailable HTML Response:", htmlContent);

      const shouldRetry = retryCount < 3; // Retry up to 3 times
      if (shouldRetry) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.log(`Retrying after ${delay}ms... (Attempt ${retryCount + 1})`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return generateImage(prompt, retryCount + 1); // Recursive retry
      }
    }

    throw new Error(
      `Image generation failed after multiple retries: ${error.message}`
    );
  }
};

export default generateImage;
