import Note from "../../../db/models/Note";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../db/connection";
import Item from "../../../db/models/Item";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const notes = await Note.find({}).where({ deleted: false });
        const processedNotes = [];
     
        for (const note of notes) {
          const todos = await Item.find({}).where({ note_id: note._id });
          const noteAsJson = note.toObject();
          processedNotes.push({ ...noteAsJson, todos });
        }
        return res.status(200).json({ processedNotes, success: true });
      } catch (error) {
        return res.status(400).json({ success: false });
      }
    case "POST":
      try {
        const { title, todos } = req.body;
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
        const newNoteAsJson = newNote.toObject();

        let newTodos = [];
        for (const todo of todos) {
          const newTodo = await Item.create({ ...todo, note_id: newNote.id });
          const todoAsJson = newTodo.toObject();
          newTodos.push(todoAsJson);
        }
        const processedNewNote = { ...newNoteAsJson, todos: newTodos };
        return res.status(201).send({ success: true, processedNewNote });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, error });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
