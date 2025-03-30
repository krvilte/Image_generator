import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { getRandomPrompts } from "../utils";
import Preview from "../assets/preview.png";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    result: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  // Function to generate image using the API
  const generateImage = async () => {
    if (!form.prompt) {
      alert("Please provide a prompt to generate an image.");
      return;
    }

    try {
      setGeneratingImg(true);

      const response = await fetch(
        "http://localhost:3001/api/v1/cape/generate-image",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: form.prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to generate image: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json(); // Parse JSON response
      const imageUrl = data.data.imageUrl; // Access imageUrl from the response

      setForm((prev) => ({ ...prev, result: imageUrl })); // Update form with new image URL
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("Error generating image");
    } finally {
      setGeneratingImg(false);
    }
  };

  // useEffect to revoke the object URL when the component unmounts or the image changes
  useEffect(() => {
    return () => {
      if (form.result) URL.revokeObjectURL(form.result);
    };
  }, [form.result]);

  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit");
    // Implement your submit logic here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setForm((prev) => ({ ...prev, prompt: randomPrompt }));
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div>
        <h2 className="font-bold text-2xl text-[#131313]">Create Post</h2>
        <p className="mt-2 text-sm max-w-[500px] text-[#7e7e96]">
          Transform your ideas into stunning visual masterpieces with cape.ai
          and share with the community.
        </p>
      </div>

      {/* Form Section */}
      <form className="mt-14 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A sunlit indoor lounge area with a pool with clear water..."
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Preview Container */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violte-600 focus:border-violte-600 w-full h-64 p-3 flex justify-center items-center">
            {form.result ? (
              <img
                src={form.result}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={Preview}
                alt="Preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(255,255,255,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Button Section */}
        <div className="my-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            disabled={generatingImg}
            className={`text-white hover:bg-green-700 bg-green-600 font-medium rounded-md text-sm w-full sm:m-auto px-5 py-2.5 text-center ${
              generatingImg ? "cursor-not-allowed" : ""
            }`}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="my-2 text-[#666e75] text-[14px]">
            Share your unique and imaginative creation with the community and
            let your creativity be the inspiration for others.
          </p>

          <button
            type="submit"
            className="text-white hover:bg-violte-600 bg-blue-500 font-medium rounded-md text-sm w-full sm:m-auto px-5 py-2.5 text-center"
          >
            Share with the community
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
