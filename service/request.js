import fetch from 'node-fetch';

export async function post(url, data) {
  try {
   const res = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
  return await res.text();
  } catch (e) {
    console.log(e);
    return { message: e, statusCode: 500 };
  }
}
