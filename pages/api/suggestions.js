import { useSession } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";




const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function Suggestion(req, res) {
    // const session = useSession();
    // const userId = session?.user?.id;
    const userId = req.query.userId
	if (req.method === "GET") {
		const { data, error } = await supabase
			.from("pantry")
			.select("*")
			.eq("userId", userId);

		if (error) {
			// return res.status(500).json({ message: error });
		}

		return res.status(200).json({ data });
	}
}
