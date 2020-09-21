import Item from "../../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { note_id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const todos = await Item.find({ note_id });
        if (todos.length < 0) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: "true", todos });
      } catch (error) {
        return res.status(400).json({ success: false });
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
