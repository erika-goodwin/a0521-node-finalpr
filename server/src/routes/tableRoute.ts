import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import Table from "../models/table.model";
import checkAuth from "../middleware/checkAuth";

//add : checkAuth,
router.get("/", async (req, res) => {
  // const { date, detail, price } = req.body;
  //   res.json({ date: date, detail: detail, price: price });
  Table.find()
    .then((tables) => res.json(tables))
    .catch((err) => res.status(400).json(err));
});

//add : checkAuth,
router.post("/add", async (req, res) => {
  const { date, detail, price } = req.body;
  //   Table.create({
  //     date: "2022/02/17",
  //     detail: "walmart - grocery",
  //     price: "35.89",
  //   });
  //   res.json({ date: date, detail: detail, price: price });

  const newTable = await Table.create({
    date,
    detail,
    price,
  });
  res.redirect("/");

  res.json({
    errors: [],
    data: {
      table: {
        id: newTable._id,
        date: newTable.date,
        detail: newTable.detail,
        price: newTable.price,
      },
    },
  });
});

router.delete("/:id", async (req, res) => {
  console.log("finding this id:", req.params.id);
  // Table.findByIdAndRemove(req.params.id, function (err: any) {
  //   if (err) {
  //     return res.json({
  //       errors: [
  //         {
  //           msg: "Cannot delete this item",
  //         },
  //       ],
  //       data: null,
  //     });
  //   } else {
  //     res.redirect("/tables");
  //   }
  // });

  Table.findOneAndDelete({ id: req.params.id }, function (err: any, docs: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User : ", docs);
    }
  });

  res.redirect("/");
});

module.exports = router;
