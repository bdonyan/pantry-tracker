import { Configuration, OpenAIApi } from 'openai';
import { NextResponse } from 'next/server';

// Set up OpenAI API configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set in .env
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
    // Parse the request to get pantry items
    const { pantryItems } = await request.json();

    // If no pantry items provided, return an error
    if (!pantryItems || pantryItems.length === 0) {
        return NextResponse.json({ message: 'Pantry items are required' }, { status: 400 });
    }

    try {
        // Define the chat prompt for OpenAI
        const prompt = `I have the following ingredients in my pantry: ${pantryItems.join(', ')}. Can you suggest a recipe using these ingredients?`;

        // Send a request to OpenAI using the chat completion method for GPT-3.5
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
            max_tokens: 200,
            temperature: 0.7,
        });

        // Extract the recipe suggestion from the response
        const recipe = response.data.choices[0].message.content.trim();

        // Return the recipe in the JSON response
        return NextResponse.json({ recipe }, { status: 200 });

    } catch (error) {
        console.error('Error fetching recipe from OpenAI:', error);
        return NextResponse.json({ error: 'Failed to fetch recipe from OpenAI' }, { status: 500 });
    }
}