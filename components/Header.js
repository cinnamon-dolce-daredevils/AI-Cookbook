import { MyProvider } from "@/pages/myState";
import * as React from "react";
import PersistentDrawerLeft from "./drawer/Leftdrawer";

// Leftdrawer houses code for navbar
function Header() {
	return (
		<MyProvider>
			<>
				<PersistentDrawerLeft />
			</>
		</MyProvider>
	);
}

export default Header;
