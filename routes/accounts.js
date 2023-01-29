import express from "express";
const router = express.Router();

import { readFile, writeFile } from "../index.js";

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("accounts.json"));

    res.status(200);
    res.json(data.accounts);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("accounts.json"));
    const { id } = req.params;

    const account = data.accounts.find((acc) => acc.id == id);

    if (account) {
      res.json(account);
      res.status(200);
    } else {
      res.json({ message: "Nenhuma conta encontrada" });
      res.status(204);
    }

    // for (let index = 0; index < data.accounts.length; index++) {
    //   if (data.accounts[index].id == id) {
    //     res.json(data.accounts[index]);
    //     res.status(200);
    //   }
    // }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let data = JSON.parse(await readFile("accounts.json"));
    const { id } = req.params;
    let response = { message: "Nenhuma conta encontrada" };
    let status = 204;

    data.accounts.filter((acc) => acc.id !== parseInt(id));

    await writeFile("accounts.json", JSON.stringify(data, null, 2));
    // for (let index = 0; index < data.accounts.length; index++) {
    //   if (data.accounts[index].id == id) {
    //     data.accounts.splice(index, 1);
    //     await writeFile("accounts.json", JSON.stringify(data));
    //     response.message = "Conta deletada com sucesso";
    //     status = 200;
    //   }
    // }

    res.json(response);
    res.status(status);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("accounts.json"));
    const { id } = req.params;
    const { nome, balance } = req.body;
    let response = { message: "Conta não existente" };
    let status = 204;
    /*

      const index = data.accounts.findIndex(
        (account) => account.id === parseInt(id)
      );
      data.accounts[index].nome = nome;
      data.accounts[index].balance = balance;

      const account = req.body
      findeIndex...
      data.accounts[index] = account;
    */

    for (let index = 0; index < data.accounts.length; index++) {
      if (data.accounts[index].id === parseInt(id)) {
        data.accounts[index].nome = nome;
        data.accounts[index].balance = balance;

        await writeFile("accounts.json", JSON.stringify(data, null, 2));

        status = 200;
        response.message = "Usuário atualizado com sucesso";
      }
    }

    res.status(status);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await readFile("accounts.json"));
    const { id } = req.params;
    const { balance } = req.body;
    const keys = Object.keys(req.body);
    let response = { message: "Conta não existente." };
    let status = 204;

    for (let index = 0; index < data.accounts.length; index++) {
      if (data.accounts[index].id === parseInt(id)) {
        if (req.body.balance && keys.length === 1) {
          data.accounts[index].balance = balance;
          await writeFile("accounts.json", JSON.stringify(data, null, 2));
          status = 200;
          response.message = "Saldo atualizado com sucesso!";
        } else {
          status = 400;
          response.message = "Parametros incorretos";
        }
      }
    }

    res.json(response);
    res.status(status);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.end();
  }
});

export default router;
