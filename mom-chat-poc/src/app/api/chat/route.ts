// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Option 1 (LiteLLM as proxy):
// - Run LiteLLM locally (or in Docker)
// - Point this OpenAI client at LiteLLM's OpenAI-compatible endpoint
//
// Defaults:
// - If you set LITELLM_BASE_URL, we use LiteLLM.
// - Otherwise we fall back to Ollama directly.

const baseURL =
  process.env.LITELLM_BASE_URL?.trim() ||
  process.env.LLM_BASE_URL?.trim() || // optional generic override
  "http://localhost:11434/v1"; // Ollama default

const apiKey =
  process.env.LITELLM_API_KEY?.trim() ||
  process.env.LLM_API_KEY?.trim() ||
  "ollama"; // Ollama ignores this, but SDK requires it

const model =
  process.env.LLM_MODEL?.trim() ||
  "llama3.1"; // when using LiteLLM you can set e.g. "granite/granite-4"

const client = new OpenAI({ baseURL, apiKey });

// Optional: ensure Node runtime (OpenAI SDK is fine in Node)
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const message: string | undefined = body?.message;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Missing 'message' in request body." },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a Manufacturing Operations Management platform assistant. Answer clearly and structured.",
        },
        { role: "user", content: message.trim() },
      ],
      temperature: 0.2,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "No reply.";
    return NextResponse.json({ reply, modelUsed: model });
  } catch (err: any) {
    // Helpful error response without leaking sensitive internals
    const msg =
      typeof err?.message === "string"
        ? err.message
        : "Unexpected server error.";
    return NextResponse.json(
      {
        error: msg,
        baseURL,
        model,
        hint:
          "If using LiteLLM, verify LITELLM_BASE_URL points to an OpenAI-compatible /v1 endpoint and that the model name is available in your LiteLLM config.",
      },
      { status: 500 }
    );
  }
}