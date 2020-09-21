import Item from "../../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../db/connection";
import Note from "../../../../db/models/Note";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { note_id },
    method,
  } = req;

  const { description, checked } = req.body;
  switch (method) {
    case "POST":
      try {
        const note = Note.findById(note_id);
        if (!note) {
          return res
            .status(400)
            .json({ success: false, msg: "unable to find the relevant note" });
        }
        const newTodo = await Item.create({ description, checked, note_id });
        return res.status(201).json({ success: true, newTodo });
      } catch (error) {
        return res.status(400).json({ success: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
