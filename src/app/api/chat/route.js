import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { messages, system, max_tokens } = await req.json();
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: max_tokens || 600,
      system,
      messages,
    });
    return Response.json({ text: response.content[0].text });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
