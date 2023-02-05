import express from "express";
const router = express.Router();

import { logger } from "../handler/index.js";

import {
  createAccount,
  getAccounts,
  getAccount,
  deleteAccount,
  updateAccount,
  updateBalance,
} from "../controllers/account.controller.js";

router.post("/", createAccount);

router.get("/", getAccounts);

router.get("/:id", getAccount);

router.delete("/:id", deleteAccount);

router.put("/:id", updateAccount);

router.patch("/:id", updateBalance);

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
  logger.error(err);
});

export default router;
