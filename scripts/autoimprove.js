#!/usr/bin/env node
import fs   from 'node:fs/promises';
import path from 'node:path';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* 1. Load the current page */
const file = path.resolve('pages', 'index.mdx');
let content = await fs.readFile(file, 'utf8');

/* 2. Craft today’s prompt */
const prompt = `
You are a website-growth agent.  
Goal: improve copy, clarity, and engagement *without* breaking MDX syntax.  
Keep headings and JSX imports intact.  
Return only the new file.
Current text:
"""${content}"""
`;

/* 3. Ask GPT for a better version */
const chat = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [
    { role: 'system', content: 'You are a senior web copywriter and MDX expert.' },
    { role: 'user',   content: prompt }
  ],
  temperature: 0.7,
});

/* 4. Replace file & inject today’s date */
let improved = chat.choices[0].message.content
  .replace('<!--DATE-->', new Date().toISOString().split('T')[0]);

await fs.writeFile(file, improved);
console.log('index.mdx updated ✅');
