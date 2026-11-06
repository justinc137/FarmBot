import type { Context } from '@netlify/functions'
import { generateRuleBasedResponse, CROPS, PESTS, SOIL_TIPS, SEASONAL, MARKET_TIPS } from './knowledge.js'

const SYSTEM_PROMPT = `You are AgriBot, an AI-powered agricultural assistant tailored for Nigerian farmers and farming conditions.
You provide practical, clear, actionable advice on:
- Major Nigerian crops: Maize (Agbado), Cassava (Garri/Ege), Rice (Ofada/Paddy), Yam (Isu), Tomato, Cocoa (Cacao), etc.
- Pest and disease control (Fall armyworm, Cassava mealybug, Stem borers, blight, mosaic virus) using both organic and approved integrated pest management (IPM) techniques.
- Fertilizer application (NPK 15:15:15, Urea top-dressing, organic manure, compost) and timing.
- Regional planting calendars distinguishing Northern zones (Savannah/Sahel: Kano, Kaduna, Sokoto, Katsina, etc.) from Southern zones (Forest/Rainforest: Lagos, Oyo, Ogun, Edo, Rivers, etc.).
- Soil management (acidity in Southern soils, sandy soils in the North, liming, organic matter).
- Harvest, moisture levels, post-harvest drying, and wholesale markets (Dawanau in Kano, Mile 12 in Lagos, Bodija in Ibadan).

Tone: Helpful, respectful, practical, and direct. Format responses clearly with markdown headings, bullet points, and highlight key steps. Avoid generic filler. Keep advice grounded in real Nigerian agricultural practices.`

export default async (req: Request, context: Context) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let userMessage = ''
  try {
    const body = await req.json()
    userMessage = (body.message || body.prompt || '').trim()
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!userMessage) {
    return new Response(JSON.stringify({ error: 'Message cannot be empty' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Check if AI Gateway is configured
  const gatewayUrl = process.env.NETLIFY_AI_GATEWAY_URL?.replace(/\/$/, '')
  const gatewayKey = process.env.NETLIFY_AI_GATEWAY_KEY

  if (gatewayUrl && gatewayKey) {
    try {
      // Use AI Gateway with Gemini 3.8 Flash or Gemini 3.5 Flash
      const aiResponse = await fetch(`${gatewayUrl}/google/v1beta/models/gemini-3.8-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${gatewayKey}`,
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nFarmer's Question: "${userMessage}"\n\nProvide practical Nigerian farming advice:`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          }
        }),
      })

      if (aiResponse.ok) {
        const data = await aiResponse.json()
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          return Response.json({
            response: text,
            source: 'ai-gateway',
          }, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          })
        }
      }
    } catch (err) {
      // If AI gateway call fails or times out, seamlessly fall back to rule-based engine
      console.warn('AI Gateway call failed, falling back to knowledge base:', err)
    }
  }

  // Fallback / standard knowledge engine
  const result = generateRuleBasedResponse(userMessage)
  return Response.json({
    response: result.response,
    source: 'knowledge-base',
    matchedCrop: result.matchedCrop,
    matchedPest: result.matchedPest,
  }, {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
}

export const config = {
  path: '/api/chat',
}
