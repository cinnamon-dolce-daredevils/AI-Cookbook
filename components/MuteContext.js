import { createContext, useContext } from 'react';

const MuteContext = createContext();
export const useMute = () => useContext(MuteContext);

export default MuteContext;
