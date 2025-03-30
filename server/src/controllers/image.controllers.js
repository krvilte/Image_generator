import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import generateImage from "../config/stabilityAi.config.js";

// @desc Get generated image
// route POST api/v1/dalle
// access Private
export const getGeneratedImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) throw new ApiError(400, "Prompt is required");

  try {
    const imageUrl = await generateImage(prompt);
    res
      .status(200)
      .json(new ApiResponse(200, "Image generated successfully", { imageUrl }));
  } catch (error) {
    console.error("Error in getGeneratedImage:", error.message);
    throw new ApiError(500, error.message || "Failed to generate image");
  }
});
