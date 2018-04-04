import CookieManager from 'react-native-cookies';

const serverAddress = "https://centsa.herokuapp.com";

let loggedIn = null;

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
    return loggedIn = resp.ok;
  } else {
    return loggedIn = false;
  }
}

export function logout() {
  loggedIn = false;
  fetch(`${serverAddress}/fb`, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    },
  });
}

export function getBudget() {
  return fetch(`${serverAddress}/api/general/budget?strict=true`, {
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

let userSettings = null;

export function checkLoggedIn(cb) {
  if (loggedIn == null) {
    CookieManager.get(serverAddress).then(async cookies => {
      if (!!cookies["connect.sid"]) {
        await loadSettings();
      }
      cb(loggedIn = userSettings != null);
    });
  } else {
    cb(loggedIn);
  }
}

export async function getSetting(setting) {
  if (!userSettings) {
    await loadSettings();
  }
  return userSettings[setting];
}

async function loadSettings() {
  const resp = await fetch(`${serverAddress}/api/settings`, { method: "GET" });
  if (resp.ok) {
    userSettings = await resp.json();
  }
}

export async function saveSetting(setting, value) {
  return fetch(`${serverAddress}/api/settings`, {
    method: "POST",
    headers: {
      'content-type': 'application/json',
      'x-date': new Date()
    },
    body: JSON.stringify({ key: setting, value: value }),
    credentials: 'include'
  });
}