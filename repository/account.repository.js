import { readFile, writeFile } from "../index.js";

export async function getAccounts() {
  const data = JSON.parse(await readFile("accounts.json"));
  return data;
}

export async function insert(account, keys) {
  const data = await getAccounts();
  account = {
    id: data.nextId++,
    ...account,
  };

  if (account.nome && account.balance && keys.length === 2) {
    data.accounts.push(account);

    await writeFile("accounts.json", JSON.stringify(data, null, 2));

    return account;
  }
}

export async function getAccountById(id) {
  const data = await getAccounts();

  const account = data.accounts.find((acc) => acc.id == id);

  return account;
}

export async function deleteAccount(id) {
  let data = await getAccounts();

  data.accounts = data.accounts.filter((acc) => acc.id !== parseInt(id));
  await writeFile("accounts.json", JSON.stringify(data, null, 2));
}

export async function updateAccount(id, nome, balance) {
  const data = await getAccounts();

  for (let index = 0; index < data.accounts.length; index++) {
    if (data.accounts[index].id === parseInt(id)) {
      data.accounts[index].nome = nome;
      data.accounts[index].balance = balance;

      await writeFile("accounts.json", JSON.stringify(data, null, 2));
    }
  }
}

export async function updateBalanceAccount(id, balance, keys) {
  const data = await getAccounts();

  for (let index = 0; index < data.accounts.length; index++) {
    if (data.accounts[index].id === parseInt(id)) {
      if (balance && keys.length === 1) {
        data.accounts[index].balance = balance;
        await writeFile("accounts.json", JSON.stringify(data, null, 2));
      }
    }
  }
}
