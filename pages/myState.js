import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export function MyProvider({ children }) {
	const [myState, setMyState] = useState(null);
	console.log(myState)

	return (
		<MyContext.Provider value={{ myState, setMyState }}>
			{children}
		</MyContext.Provider>
	);
}

export function useMyState() {
	return useContext(MyContext);
}
