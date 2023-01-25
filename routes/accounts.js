import express from "express";
const router = express.Router();

import { readFile, writeFile } from "../index.js";

router.post("/cadastrar", async (req, res) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile("accounts.json"));
    account = {
      id: data.nextId++,
      ...account,
    };
    data.accounts.push(account);

    await writeFile("accounts.json", JSON.stringify(data, null, 2));
    res.json(account);
    res.status(201);
  } catch (error) {
    res.status(400);
    console.log(error);
    res.end();
  }
});

export default router;
