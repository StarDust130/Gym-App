const fetch = require('node-fetch');

async function test() {
  const apiKey = process.env.GROQ_API_KEY || "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";
  const req = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
    body: JSON.stringify({
        model: "llama3-8b-8192", 
        messages: [{ role: "user", content: "Say {" }],
        temperature: 0.7,
      })
  });
  const res = await req.json();
  console.log(res);
}
test();
