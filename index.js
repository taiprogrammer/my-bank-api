import express, { json } from "express";
import { promises as fs } from "fs";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

import routerAccount from "./routes/account.routes.js";
import { swaggerDocument } from "./doc.js";
import { logger } from "./handler/index.js";

import {
  get,
  getById,
  create,
  deleteById,
  update,
} from "./services/account.services.js";

export const { readFile, writeFile } = fs;

const schema = buildSchema(`
  type Account {
    id: Int,
    nome: String,
    balance: Float
  }
  input AccountInput {
    id: Int,
    nome: String,
    balance: Float
  }
  type Query {
    getAccounts: [Account]
    getAccount(id: Int): Account
  }
  type Mutation {
    createAccount(account: AccountInput): Account
    deleteAccount(id: Int): Boolean
    updateAccount(account: AccountInput): Account
  }
`);

const root = {
  getAccounts: () => get(),
  getAccount(args) {
    return getById(args.id);
  },
  createAccount({ account }) {
    return create(account);
  },
  deleteAccount(args) {
    return deleteById(args.id);
  },
  updateAccount({ account }) {
    return update(account);
  },
};

const app = express();
app.use(json());
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/account", routerAccount);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

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
