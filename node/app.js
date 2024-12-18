const dotenv = require('dotenv');
const OpenAI = require('openai');
const express = require('express');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Securely load API key from environment variables
});

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

/**
 * Endpoint: /message
 * Purpose: Generates a response using the GPT-3.5-turbo model.
 * Request Body: { prompt: string }
 * Response: { message: string }
 */
app.post('/message', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt || 'Write a friendly welcome message for new user' }],
    });
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle API errors gracefully
  }
});

/**
 * Endpoint: /completion
 * Purpose: Generates a text completion using the text-davinci-003 model.
 * Request Body: { prompt: string }
 * Response: { message: string }
 */
app.post('/completion', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' }); // Validate request input
  }

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50, // Limit response length
    });
    res.json({ message: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle API errors gracefully
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
