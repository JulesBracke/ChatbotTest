import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1",
  apiKey: "ollama",
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "llama3.1",
    messages: [
      {
        role: "system",
        content: "You are a Manufacturing Operations Management platform assistant. Answer clearly and structured.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.2,
  });

  const reply = completion.choices[0]?.message?.content ?? "No reply.";

  return NextResponse.json({ reply });
}