import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use POST instead." });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid prompt. A non-empty string is required." });
  }

  try {
    const response = await fetch("https://api.gemini.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`, // Ensure your API key is stored in .env
      },
      body: JSON.stringify({
        prompt,
        model: "text-davinci-003", // Replace with the desired model as per Gemini API documentation
        max_tokens: 1000, // Adjust this value based on the desired blog length
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res
        .status(response.status)
        .json({ error: errorData.error || "Failed to fetch from Gemini API" });
    }

    const data = await response.json();
    const blog = data.choices?.[0]?.text?.trim(); // Adjust based on the actual Gemini API response structure

    if (!blog) {
      return res
        .status(500)
        .json({ error: "Failed to generate blog content." });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error("Error generating blog:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
}
