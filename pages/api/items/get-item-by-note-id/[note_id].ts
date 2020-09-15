import Item from "../../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { note_id }, //whats on the dynamic route
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const todos = await Item.find({ note_id });
        if (todos.length < 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: "true", todos });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    // case "PUT":
    //   try {
    //     const note = await Note.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     });
    //     if (!note) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: note });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    // case "DELETE":
    //   try {
    //     const deletedNote = await Note.deleteOne({ _id: id });
    //     if (!deletedNote) {
    //       return res.status(400).json({ success: false });
    //     }
    //     res.status(200).json({ success: true, data: {} });
    //   } catch (error) {
    //     res.status(400).json({ success: false });
    //   }
    //   break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
