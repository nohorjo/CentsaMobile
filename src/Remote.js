
//FIXME: replace with actual host for prod
const serverAddress = "http://192.168.1.11:8080";

export async function authenticate(e) {
  if (e.type == 'success') {
    const resp = await fetch(`${serverAddress}/fb`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userID: e.credentials.userId,
        accessToken: e.credentials.token
      }),
      credentials: 'include'
    });
    return resp.ok;
  } else {
    return false;
  }
}

export function logout() {
  fetch(`${serverAddress}/fb`, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    },
  });
}

export function getBudget() {
  return fetch(`${serverAddress}/api/general/budget`, {
    method: "GET",
    headers: {
      'x-date': new Date()
    },
  });
}

export function getAccounts() {
  return fetch(`${serverAddress}/api/accounts`, { method: "GET" });
}

export function getExpenses() {
  return fetch(`${serverAddress}/api/expenses`, { method: "GET" });
}

export function getTypes() {
  return fetch(`${serverAddress}/api/types`, { method: "GET" });
}

export async function saveTransaction(trans) {
  return fetch(`${serverAddress}/api/transactions`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'x-date': new Date()
    },
    body: JSON.stringify(trans),
    credentials: 'include'
  });
}