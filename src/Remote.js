
//FIXME: replace with actual host for prod
const serverAddress = "http://192.168.1.11:8080";

let connectSid;

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
    if (resp.ok) {
      connectSid = resp.headers.map["set-cookie"][0].split(";").find(c => c.startsWith("connect.sid")).split("=")[1];
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}