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
        const item = Item.findById(item_id);
        if (!item) {
          return res
            .status(400)
            .json({ success: false, msg: "unable to find the relevant item" });
        }
        const items = await Item.findByIdAndUpdate(
          item_id,
          { checked },
          {
            new: true,
            runValidators: false,
          }
        );

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
