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

  return {
    selectedPersonality,
    handleChangePersonality,
  };
}
