import Item from "../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const items = await Item.find({}).populate("note_id");
        res.status(200).json({ success: true, items });
      } catch (error) {
        res.status(400).json({ success: false, items: [] });
      }
      break;
      // case "POST":
      //   try {
      //     const notes = await Note.create(req.body);
      //     res.status(201).json({ success: true, data: notes });
      //   } catch (error) {
      //     res.status(400).json({ success: false });
      //   }
      //   break;
      // default:
      res.status(400).json({ success: false });
      break;
  }
};
