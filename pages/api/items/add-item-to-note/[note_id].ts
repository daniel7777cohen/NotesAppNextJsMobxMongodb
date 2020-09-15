import Item from "../../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../../db/connection";
import Note from "../../../../db/models/Note";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { note_id }, //whats on the dynamic route
    method,
  } = req;

  const { description, checked } = req.body;
  switch (method) {
    case "POST":
      try {
        console.log(description + " " + checked);

        const note = Note.findById(note_id);
        console.log(note + " is note inside Items path");
        if (!note) {
          return res
            .status(400)
            .json({ success: false, msg: "unable to find the relevant note" });
        }
        const items = await Item.create({ description, checked, note_id });
        console.log(items + " is note inside Items path");

        res.status(201).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
