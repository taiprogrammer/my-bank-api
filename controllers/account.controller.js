import {
  create,
  get,
  getById,
  deleteById,
  update,
  balanceUpdate,
} from "../services/account.services.js";

export async function createAccount(req, res, next) {
  try {
    let account = req.body;
    let keys = Object.keys(account);

    if (!account.nome || !account.balance == null) {
      throw new Error("O nome e o balance são obrigatórios.");
    }

    account = await create(account, keys);

    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function getAccounts(req, res, next) {
  try {
    const data = await get();
    res.status(200);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getAccount(req, res, next) {
  try {
    const { id } = req.params;

    const account = await getById(id);

    if (account) {
      res.json(account);
      res.status(200);
    } else {
      logger.info("Nenhuma conta encontrada");
      res.json({ message: "Nenhuma conta encontrada" });
      res.status(204);
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteAccount(req, res, next) {
  try {
    const { id } = req.params;

    deleteById(id);

    res.end();
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  try {
    const account = req.body;

    update(account);

    res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function updateBalance(req, res, next) {
  try {
    const { id } = req.params;
    const { balance } = req.body;
    const keys = Object.keys(req.body);
    if (balance === null) {
      throw new Error("Balance é obrigatório.");
    }

    res.send(await balanceUpdate(id, balance, keys));
  } catch (error) {
    next(error);
  }
}
