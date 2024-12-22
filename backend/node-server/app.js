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
const port = process.env.PORT || 8000; // Use PORT from Azure, default to 8000 for local testing

// Middleware to parse JSON requests
app.use(bodyParser.json());

/**
 * Endpoint: /
 * Purpose: Provides information about the server.
 * Response: A message explaining the purpose of the server and the developer's name.
 */
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the GPT-3.5-turbo Response Server</h1>
    <p>This server allows you to generate responses from OpenAI's GPT-3.5-turbo model by sending a POST request to the <code>/message</code> endpoint with a JSON body containing a prompt.</p>
    <p>Developer: Ayham Farhat</p>
    <p>Feel free to explore and integrate this API into your applications.</p>
  `);
});

/**
 * Endpoint: /message
 * Purpose: Generates a response using the GPT-3.5-turbo model.
 * Request Body: { prompt: string }
 * Response: { message: string }
 */
app.post('/message', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' }); // Validate input
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }], // Use the prompt from the request
      temperature: 0.8,
    });
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors gracefully
  }
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
