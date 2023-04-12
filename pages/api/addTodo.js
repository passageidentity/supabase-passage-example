// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSupabase } from "../../utils/supabase";

export default async function handler(req, res) {
  const { userID, todo } = req.body;
  console.log({ userID, todo });
  const supabase = getSupabase(userID);
  const { data, error } = await supabase
    .from("todo")
    .insert({ title: todo, user_id: userID })
    .select()
    .single();
  if (error) return res.status(400).json(error);
  res.status(200).json(data);
}
