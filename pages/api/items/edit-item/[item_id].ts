import Item from "../../../../db/models/Item";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../../../../db/connection";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { item_id },
    method,
  } = req;

  const { checked } = req.body;
  switch (method) {
    case "PUT":
      try {
         await Item.findByIdAndUpdate(
          item_id,
          { checked },
          {
            new: true,
            runValidators: false,
          }
        );

        return res.status(201).json({ success: true});
      } catch (error) {
        res.status(400).json({ success: error.message });
      }
    default:
      return res.status(400).json({ success: false });
  }
};
