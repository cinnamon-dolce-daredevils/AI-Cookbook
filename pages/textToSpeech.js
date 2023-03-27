import axios from 'axios';

const XI_API_KEY = process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY;
const voiceId = 't6MIz2qWmjgDKIYWSjVq';
export async function textToSpeech(text, currentVoiceId) {
  try {
    const cleanedText = text.replace(/[^a-zA-Z0-9\s/.-]+/g, '');
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
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
