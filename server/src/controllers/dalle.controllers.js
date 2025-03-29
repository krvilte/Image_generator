import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { generateImage } from "../config/openaiConfig.js";

// @desc Get generated image
// route GET api/v1/dalle
// access Private
export const getGeneratedImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) throw new ApiError(400, "Prompt is required");

  const imageUrl = await generateImage(prompt);
  if (!imageUrl) throw new ApiError(500, "Image generation failed");

  res
    .status(200)
    .json(new ApiResponse(200, "Image generated successfully", { imageUrl }));
});
