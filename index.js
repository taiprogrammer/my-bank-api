import express, { json } from "express";
import { promises as fs } from "fs";
import cors from "cors";

import routerAccount from "./routes/accounts.js";
import { logger } from "./handler/index.js";

export const { readFile, writeFile } = fs;

const app = express();
app.use(json());
app.use(cors());

app.use("/account", routerAccount);

app.listen(3000, async () => {
  try {
    await readFile("accounts.json");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    writeFile("accounts.json", JSON.stringify(initialJson))
      .then(() => {
        logger.info("Ok");
      })
      .catch((err) => {
        logger.error("Not ok");
      });
  }
});
