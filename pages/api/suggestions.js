
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function Suggestion(req, res) {
    const userId = req.query.userId
	if (req.method === "GET") {
		const { data, error } = await supabase
			.from("pantry")
			.select("*")
			.eq("userId", userId);

		return res.status(200).json({ data });
	}
}
