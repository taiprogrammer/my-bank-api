import { readFile, writeFile } from "../index.js";

export async function getAccounts() {
  const data = JSON.parse(await readFile("accounts.json"));
  return data.accounts;
}

export async function insert(account) {
  const data = JSON.parse(await readFile("accounts.json"));
  account = {
    id: data.nextId++,
    ...account,
  };

  if (account.nome && account.balance) {
    data.accounts.push(account);

    await writeFile("accounts.json", JSON.stringify(data, null, 2));

    return account;
  }
}

export async function getAccountById(id) {
  const data = await getAccounts();

  const account = data.find((acc) => acc.id == id);

  return account;
}

export async function deleteAccount(id) {
  let data = JSON.parse(await readFile("accounts.json"));

  data.accounts = data.accounts.filter((acc) => acc.id !== parseInt(id));
  await writeFile("accounts.json", JSON.stringify(data, null, 2));
}

export async function updateAccount(account) {
  const data = JSON.parse(await readFile("accounts.json"));
  const index = data.accounts.findIndex((item) => item.id === account.id);

  if (index === -1) {
    throw new Error("Registro não encontrado.");
  }

  if (account.nome) {
    data.accounts[index].nome = account.nome;
  }

  if (account.balance) {
    data.accounts[index].balance = account.balance;
  }

  await writeFile("accounts.json", JSON.stringify(data, null, 2));

  return data.accounts[index];
}

export async function updateBalanceAccount(id, balance) {
  const data = await getAccounts();

  for (let index = 0; index < data.length; index++) {
    if (data[index].id === parseInt(id)) {
      data[index].balance = balance;
      await writeFile("accounts.json", JSON.stringify(data, null, 2));
    }
  }
}
