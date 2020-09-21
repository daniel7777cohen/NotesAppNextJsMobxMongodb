import Note from "../../../db/models/Note";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({}).where({ deleted: false });
        return res.status(200).json({ success: true, notes });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        const { title } = req.body;
        const noteExistsResponse = await Note.findOne({
          title,
          deleted: false,
        });

        if (noteExistsResponse) {
          console.log("note title exsists!");
          return res.status(400).send({
            success: false,
            msg: "note title already exists. choose a different title",
          });
        }

        const newNote = await Note.create(req.body);
        return res.status(201).send({ success: true, newNote });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
