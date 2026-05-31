import axios from 'axios'

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

const systemPrompt = `You are a compassionate assistant helping citizens apply for government 
social support. Based on the context the user provides, help them write a clear, honest and 
concise description of their situation. Keep the response between 100 and 150 words. 
Use simple, plain language. Do not exaggerate or fabricate details.`

export type FieldType = 'financialSituation' | 'employmentCircumstances' | 'reasonForApplying'

const fieldPrompts: Record<FieldType, string> = {
  financialSituation: 'Help me write a description of my current financial situation based on this context:',
  employmentCircumstances: 'Help me write a description of my employment circumstances based on this context:',
  reasonForApplying: 'Help me write a clear reason for applying for social support based on this context:',
}

const mockResponses: Record<FieldType, string> = {
  financialSituation: `I am currently facing significant financial hardship due to a loss of stable income. 
My monthly expenses exceed my current earnings, making it difficult to cover basic necessities 
such as food, utilities, and rent. I have no savings to fall back on and have exhausted other 
means of support. I am actively seeking employment but have been unsuccessful so far. 
This assistance would provide me with the stability I need to get back on my feet.`,

  employmentCircumstances: `I have been unemployed for several months following the end of my previous contract. 
Despite actively applying for positions in my field, I have not yet secured new employment. 
I have been attending job training programs to improve my skills and increase my chances of 
finding work. The current job market has made it particularly challenging to find suitable 
opportunities that match my qualifications and experience.`,

  reasonForApplying: `I am applying for financial assistance because I am currently unable to meet my basic 
living expenses due to unemployment. I have two dependents who rely on me for their daily needs. 
Without this support, I risk being unable to provide adequate housing and food for my family. 
I am committed to improving my situation and view this assistance as a temporary measure while 
I work toward financial independence.`,
}

const USE_MOCK = !import.meta.env.VITE_OPENAI_API_KEY ||
  import.meta.env.VITE_OPENAI_API_KEY === 'your_openai_api_key_here'

async function getMockSuggestion(fieldType: FieldType): Promise<string> {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return mockResponses[fieldType]
}

export async function getAISuggestion(
  fieldType: FieldType,
  userContext: string
): Promise<string> {
  if (USE_MOCK) {
    return getMockSuggestion(fieldType)
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  const userPrompt = `${fieldPrompts[fieldType]}\n\n"${userContext}"`

  const response = await axios.post(
    OPENAI_URL,
    {
      model: 'gpt-3.5-turbo',
      max_tokens: 200,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    }
  )

  const suggestion = response.data.choices?.[0]?.message?.content

  if (!suggestion) {
    throw new Error('No suggestion received from AI')
  }

  return suggestion.trim()
}