import { useState, useEffect } from 'react';
import { getVoiceIdForPersonality } from './voiceUtils';

export function useSelectedPersonality() {
  const [selectedPersonality, setSelectedPersonality] = useState('Normal AI');

  useEffect(() => {
    const storedPersonality = localStorage.getItem('selectedPersonality');
    if (storedPersonality) {
      setSelectedPersonality(storedPersonality);
    }
  }, []);

  const storePersonalityInLocalStorage = (selectedPersonality) => {
    localStorage.setItem('selectedPersonality', selectedPersonality);
  };

  const handleChangePersonality = (event) => {
    const newPersonality = event.target.value;
    setSelectedPersonality(newPersonality);
    storePersonalityInLocalStorage(newPersonality);
  };

  const currentVoiceId = getVoiceIdForPersonality(selectedPersonality);

  return {
    selectedPersonality,
    handleChangePersonality,
    currentVoiceId,
  };
}