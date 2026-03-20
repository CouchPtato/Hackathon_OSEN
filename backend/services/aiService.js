import OpenAI from "openai";

export const generateTasks = async (hobby) => {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!process.env.OPENAI_API_KEY) {
    console.log("❌ API KEY NOT FOUND");
    throw new Error("Missing OpenAI API Key");
  }

  const prompt = `
  Hobby: ${hobby}
  Generate:
  1. Today's task
  2. 3-day plan
  3. Bonus challenge
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};