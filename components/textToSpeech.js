import axios from 'axios';
import { useSelectedPersonality } from '@/components/useSelectedPersonality'; 

const XI_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;

export async function textToSpeech(text, selectedPersonality) {
  const currentVoiceId = useSelectedPersonality(getVoiceIdForPersonality);
  
  try {
    const cleanedText = text.replace(/[^a-zA-Z0-9\s/.-]+/g, '');
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${currentVoiceId}`,
      {
        text: cleanedText,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': XI_API_KEY,
        },
        responseType: 'blob',
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    return null;
  }
}
