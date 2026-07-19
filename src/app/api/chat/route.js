import { NextResponse } from 'next/server';
import { PROJECTS_DATA } from '../../../data/projects';
import { NOTES_DATA } from '../../../data/notes';

export const dynamic = 'force-dynamic';

function getSystemPrompt() {
  let prompt = `You are the Portfolio Guide, a thoughtful, professional, and calm AI assistant representing Muhammad Hafizh (Taufiqu). 
Your responsibility is to help visitors navigate and understand Hafizh's portfolio, work, projects, engineering decisions, and experience.

Hafizh's Profile:
- Full Name: Muhammad Hafizh (Taufiqu)
- Role: Software Engineer
- Focus: Frontend Architecture, Web Applications
- Based in: Lampung, Indonesia
- Core Philosophy: "Building software that remains maintainable as it grows."
- Website Brand: Taufiqu - Portofolio
- Technical Stack: React, Next.js, Laravel, Go, PostgreSQL

Strict Boundaries:
1. ONLY answer questions related to Hafizh's projects, engineering philosophy, experience, technologies, photography, education, resume, and portfolio content.
2. If the user asks about unrelated topics (e.g., general programming tutorials, writing code unrelated to his projects, cooking recipes, math exercises, general knowledge, or other people), you MUST politely decline to answer.
   Example rejection: "I am designed specifically to guide you through Taufiqu's portfolio, projects, and engineering experience. Please let me know if you have questions about his work."
3. Speak in a calm, professional, and objective tone. Never use exaggerated promotional language or buzzwords. Explain technical arsitektur decisions honestly, including constraints and lessons.
4. Never fabricate or invent experiences. If a project or detail is not mentioned in the portfolio data below, state honestly that you do not have that information.
5. Keep responses concise, clear, and structured. Encourage visitors to read the relevant case studies using the URLs provided below when discussing a specific project.

Here is the synchronized portfolio database:

--- PROJECTS DATA ---
`;

  PROJECTS_DATA.forEach((p) => {
    prompt += `
Title: ${p.title}
Year: ${p.year}
Role: ${p.role}
Stack: ${p.tech.join(', ')}
Engineering Challenge: ${p.summary}
Problem: ${p.problem}
Constraints: ${p.constraints}
Approach: ${p.approach}
Outcome: ${p.outcome}
Lessons Learned: ${p.lessons}
Case Study URL: /work/${p.id}
`;
  });

  prompt += `\n--- NOTEBOOK ENTRIES ---\n`;

  NOTES_DATA.forEach((n) => {
    prompt += `
Title: ${n.title}
Date: ${n.date}
Tags: ${n.tags.join(', ')}
Summary: ${n.summary}
Article URL: /notebook/${n.id}
`;
  });

  prompt += `\n--- PHOTOGRAPHY OBSERVATIONS ---\n`;
  prompt += `Hafizh has a photography section labeled 'Observations'. It showcases his attention to detail, visual composition, and geometric layout. He photographs monochrome architectural structures, shadows, and alignments. Captions include locations and short observations (no EXIF metadata). It represents how he sees visual structures.`;

  prompt += `\n--- EDUCATION & HISTORY ---\n`;
  prompt += `Education: Computer Science student at Universitas Lampung (Unila), Indonesia. Major in digital transformational tools and web systems development.`;

  return prompt;
}

export async function POST(request) {
  try {
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages payload' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'tencent/hy3:free';

    if (!apiKey) {
      console.error('Missing OpenRouter API Key in environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const systemPrompt = getSystemPrompt();

    // Call OpenRouter completions endpoint
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://taufiqu.vercel.app',
        'X-Title': 'Taufiqu Portfolio',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API failure:', errText);
      return NextResponse.json({ error: 'Failed to communicate with AI provider' }, { status: response.status });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (!assistantMessage) {
      throw new Error('Empty completion choice returned from OpenRouter');
    }

    return NextResponse.json(assistantMessage);
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
