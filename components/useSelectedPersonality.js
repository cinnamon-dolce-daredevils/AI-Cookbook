import { useState, useEffect } from 'react';

export function useSelectedPersonality() {
  const [selectedPersonality, setSelectedPersonality] = useState('normalAI');

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

  const getVoiceIdForPersonality = (selectedPersonality) => {
    switch (selectedPersonality) {
      case 'spongebob':
        return 't6MIz2qWmjgDKIYWSjVq';
      case 'snoopDogg':
        return 'F6xWCOHzFNH7NLSxxKgk';
      case 'gordonRamsay':
        return 'I9J5r9wr9Y0Ta0Q1jhgh';
      default:
        return 't6MIz2qWmjgDKIYWSjVq';
    }
  };

  const currentVoiceId = getVoiceIdForPersonality(selectedPersonality);

  return {
    selectedPersonality,
    handleChangePersonality,
    currentVoiceId,
  };
}
