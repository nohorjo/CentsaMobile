
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
  if (connectSid) {
    fetch(`${serverAddress}/fb`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json'
      },
    });
  }
}
