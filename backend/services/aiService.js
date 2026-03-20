import OpenAI from "openai";

export const generateTasks = async (hobby) => {
  try {
    // ✅ If no API key → fallback immediately
    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ No API key, using fallback");
      return fallbackTasks(hobby);
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
    Hobby: ${hobby}
    Generate:
    1. Today's task (short, actionable)
    2. 3-day plan
    3. Bonus challenge
    `;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;

  } catch (error) {
    // ❌ If API fails (quota, network, etc.)
    console.log("⚠️ AI failed, using fallback:", error.message);
    return fallbackTasks(hobby);
  }
};

// 🔥 Fallback generator (important for demo)
const fallbackTasks = (hobby) => {
  return `
🌱 Today's Task:
Practice ${hobby} for 15 minutes

📅 3-Day Plan:
Day 1: Learn basics of ${hobby}
Day 2: Practice consistently for 20 minutes
Day 3: Apply what you learned in a small project

⭐ Bonus Challenge:
Watch a tutorial or try a slightly advanced version of ${hobby}
`;
};