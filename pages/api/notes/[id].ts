import Note from "../../../db/models/Note";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../db/connection";
import Item from "../../../db/models/Item";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "DELETE":
      try {
        await Note.findByIdAndUpdate(id, { deleted: true });
        const items = await Item.updateMany(
          { note_id: id },
          { $set: { deleted: true } }
        );
        if (!items || items.length < 0) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json({ success: "true" });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
