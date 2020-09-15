import Note from "../../../db/models/Note";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../db/connection";
import Item from "../../../db/models/Item";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id }, //whats on the dynamic route
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const note = await Note.findById(id);
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        console.log(id);
        await Note.findByIdAndUpdate(id, { deleted: true });

        // const deleteRelatedItems = Item.deleteMany({ note_id: id });
        // console.log(
        //   "deleteRelatedItems  is " + " " + JSON.stringify(deleteRelatedItems)
        // );

        // if (!deleteRelatedItems) {
        //   return res.status(400).json({ success: false });
        // }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
