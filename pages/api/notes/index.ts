import Note from "../../../db/models/Note";
import Item from "../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";

import connectDb from "../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({}).where({ deleted: false });
        res.status(200).json({ success: true, notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { title } = req.body;
        const noteExistsResponse = await Note.findOne({
          title,
          deleted: false,
        });

        console.log(title + " is title");

        console.log(noteExistsResponse);
        console.log("is noteExistsResponse");

        if (noteExistsResponse) {
          console.log("note title exsists!");
          return res.status(400).send({
            success: false,
            msg: "note title already exists. choose a different title",
          });
        }

        const note = await Note.create(req.body);
        console.log(note);

        console.log("note created successfully");
        res.status(201).json({ success: true, note });
        break;
      } catch (error) {
        res.status(400).json({ success: false, error });
        break;
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
};
