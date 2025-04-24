import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest } from "next/server";

const geminiKey = process.env.GOOGLE_API_KEY;

if (!geminiKey) {
  throw new Error("GOOGLE_API_KEY is not set!.");
}

const model = "gemini-2.0-flash-001";

export async function POST(request: NextRequest) {
  try {
    const prompt = await request.json();
  } catch (err) {}
}
export const summariseText = async (prompt: string) => {
  const { text } = await generateText({
    model: google(model),
    prompt,
  });

  const answer = await summariseText(
    "what is the chemical formula for dihydrogen monoxide",
  );

  console.log(answer);
  return text;
};
